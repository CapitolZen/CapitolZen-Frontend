import Ember from 'ember';
import { task } from 'ember-concurrency';

const {inject: {service}, get, set} = Ember;

export default Ember.Component.extend({
  store: service(),
  groupList: [],
  isActive: false,
  bill: null,
  listGroups: task(function * () {
    let groups = yield get(this, 'store').findAll('group');
    set(this, 'groupList', groups);
  }),
  addToGroup: task(function * () {
    // TODO: find wrapper that matches bill, if not, create one, then add it to group via
    // some sort of thing
  }),
  actions: {
    toggleActive() {
      this.toggleProperty('isActive');
      get(this, 'listGroups').perform();
    }
  }
});
