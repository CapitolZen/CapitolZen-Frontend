import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { empty } from '@ember/object/computed';
import { assert } from '@ember/debug';

export default Component.extend({
  classNames: ['d-inline'],
  store: service(),
  currentUser: service(),
  isDisabled: empty('selected'),
  type: 'link',
  buttonClass: computed('type', function() {
    return ` btn-${this.type} `;
  }),
  init() {
    this._super(...arguments);
    assert('Must provide a valid `group`', get(this, 'group.id'));
  },
  searchBills: task(function*(term) {
    yield timeout(400);
    return get(this, 'store').query('bill', { search: term });
  }),
  createWrapper: task(function*() {
    let bill = get(this, 'selected'),
      group = get(this, 'group'),
      organization = get(this, 'currentUser.currentOrganization');

    let wrapper = get(this, 'store').createRecord('wrapper', {
      bill,
      group,
      organization
    });
    yield wrapper.save();
    set(this, 'selected', null);
  }),
  actions: {
    saveBill() {
      get(this, 'createWrapper').perform();
    }
  }
});
