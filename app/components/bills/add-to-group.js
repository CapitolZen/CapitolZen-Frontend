import Ember from 'ember';
import { task } from 'ember-concurrency';

const {inject: {service}, get, set} = Ember;

export default Ember.Component.extend({
  store: service(),
  currentUser: service(),
  classNames: ['w-100'],
  groupList: null,
  isActive: false,
  bill: null,
  listGroups: task(function * () {
    let groups = yield get(this, 'store').findAll('group');
    set(this, 'groupList', groups);
  }),
  addBillToGroup: task(function * (group) {
    let bill = get(this, 'bill');
    let wrapper = yield this.get('store').query('wrapper', {bill__state_id: bill.get('stateId'), bill__state: bill.get('state')});
    let groupData = {group_id: group.id};

    if (wrapper.get('length')) {
      wrapper = wrapper.get('firstObject');
      wrapper.get('groups').pushObject(groupData);

    } else {
      wrapper = this.get('store').createRecord('wrapper', {
        bill: get(this, 'bill'),
        groups: [groupData],
        organization: get(this, 'currentUser.organization')
      });
    }
    if (get(this, 'groupList').get('length') == 0) {
      this.toggleProperty('isActive');
    }
    wrapper.save();
  }),
  actions: {
    toggleActive() {
      this.toggleProperty('isActive');
      get(this, 'listGroups').perform();
    }
  }
});
