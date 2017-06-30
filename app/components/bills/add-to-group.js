import Ember from 'ember';
import { task } from 'ember-concurrency';

const {inject: {service}, get, set} = Ember;

export default Ember.Component.extend({
  store: service(),
  classNames: ['w-100'],
  groupList: [],
  isActive: false,
  bill: null,
  listGroups: task(function * () {
    let groups = yield get(this, 'store').findAll('group');
    set(this, 'groupList', groups);
  }),
  actions: {
    toggleActive() {
      this.toggleProperty('isActive');
      get(this, 'listGroups').perform();
    }
  }
});
