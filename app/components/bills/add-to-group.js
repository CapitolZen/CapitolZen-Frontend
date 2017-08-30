import Ember from 'ember';
import { task, hash } from 'ember-concurrency';

const { inject: { service }, get, set, Component, assert } = Ember;

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

    let storeHash = {
      wrappers: get(this, 'store').query('wrapper', {
        bill__state_id: bill.get('stateId'),
        bill__state: bill.get('state')
      }),
      groups: get(this, 'store').findAll('group')
    };

    let { wrappers, groups } = yield hash(storeHash);

    let wrapperGroupIds = wrappers.map(w => {
      return get(w, 'group.id');
    });

    if (wrapperGroupIds.length && groups.length) {
      let filteredList = [];
      groups.forEach(g => {
        if (wrapperGroupIds.indexOf(g.get('id')) < 0) {
          filteredList.push(g);
        }
      });
      set(this, 'groupList', filteredList);
    } else {
      set(this, 'groupList', groups);
    }
  }),
  addBillToGroup: task(function*(group) {
    let bill = get(this, 'bill');

    let storeHash = {
      wrapper: get(this, 'store').query('wrapper', {
        bill__state_id: bill.get('stateId'),
        bill__state: bill.get('state'),
        group: group.get('id')
      }),
      model: get(this, 'store').findRecord('bill', get(bill, 'id'))
    };

    let { wrapper, model } = yield hash(storeHash);

    if (!wrapper.get('length')) {
      wrapper = this.get('store').createRecord('wrapper', {
        bill: model,
        group: group,
        organization: get(this, 'currentUser.organization')
      });
      wrapper.save();
      get(this, 'flashMessages').success(
        `${bill.get('stateId')} saved for ${group.get('title')}`
      );
    }
  }),
  actions: {
    toggleActive() {
      get(this, 'listGroups').perform();
    }
  }
});
