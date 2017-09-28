import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
import Component from '@ember/component';
import { assert } from '@ember/debug';
import { task, hash } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  classNames: ['w-100'],
  groupList: null,
  bill: null,
  buttonSize: false,
  displayText: true,
  buttonText: 'Add to Client',
  buttonType: 'secondary',
  menuAlign: 'right',
  didInsertAttrs() {
    assert('Bill is required ', get(this, 'bill'));
  },
  listGroups: task(function*() {
    let bill = get(this, 'bill');

    let groups = yield get(this, 'store').query('group', {
      without_bill: bill.get('id')
    });

    set(this, 'groupList', groups);
  }),
  addBillToGroup: task(function*(group) {
    let bill = get(this, 'bill.content');
    let wrapper = this.get('store').createRecord('wrapper', {
      bill: bill,
      group: group,
      organization: get(this, 'currentUser.organization')
    });
    wrapper
      .save()
      .then(() => {
        set(this, 'groupList', null);
        get(this, 'flashMessages').success(
          `${bill.get('stateId')} saved for ${group.get('title')}`
        );
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
    }
  }
});
