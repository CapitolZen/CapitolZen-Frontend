import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { assert } from '@ember/debug';
import { task, hash } from 'ember-concurrency';
import { A } from '@ember/array';
import { all } from 'rsvp';

export default Component.extend({
  store: service(),
  media: service(),
  currentUser: service(),
  flashMessages: service(),
  classNames: ['w-100'],
  groupList: null,
  bill: null,
  buttonSize: false,
  displayText: true,
  buttonText: 'Add to Client',
  buttonType: 'outline-secondary',
  menuAlign: 'right',

  didRecieveAttrs() {
    assert('Bill is required ', get(this, 'bill'));
  },
  isMobile: alias('media.isMobile'),
  listGroups: task(function*() {
    let bill = get(this, 'bill');

    let groups = yield get(this, 'store').query('group', {
      without_bill: bill.get('id'),
      sort: 'title'
    });

    set(this, 'groupList', groups);
  }),
  addBillToGroup: task(function*(group) {
    let bill = get(this, 'bill');
    let wrapper = this.get('store').createRecord('wrapper', {
      bill: bill,
      group: group,
      organization: get(this, 'currentUser.organization')
    });

    wrapper
      .save()
      .then(() => {
        set(group, 'isSelected', true);
      })
      .catch(e => {
        console.log(e);
        get(this, 'flashMessages').danger(
          'An error occurred and our team has been notified.'
        );
      });
  }),

  actions: {
    toggleActive() {
      get(this, 'listGroups').perform();
    },
    openModal() {
      set(this, 'openModal', true);
      get(this, 'listGroups').perform();
    },
    closeModal() {
      get(this, 'groupList').forEach(g => {
        set(g, 'isSelected', null);
      });
      set(this, 'groupList', null);
      set(this, 'openModal', false);
      get(this, 'flashMessages').success('Bills saved!');
    }
  }
});
