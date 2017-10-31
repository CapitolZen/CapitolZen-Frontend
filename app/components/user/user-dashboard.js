import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
export default Component.extend({
  currentUser: service(),
  store: service(),
  userName: alias('currentUser.user.name'),
  orgName: alias('currentUser.organization.name'),
  userSavedGroups: alias('currentUser.user.savedGroups'),
  queriedGroup: [],
  groupList: computed(function() {
    if (isEmpty(get(this, 'userSavedGroups'))) {
      return get(this, 'queriedGroup');
    } else {
      return get(this, 'userSavedGroups');
    }
  }),
  fetchGroups: task(function*() {
    let groups = yield get(this, 'store').query('group', { active: true });
    set(this, 'queriedGroup', groups);
  }).on('init'),
  fetchBills: task(function*() {
    let bills = yield get(this, 'store').query('bill', {
      introduced_in: 7
    });
    set(this, 'recentBills', bills);
  }).on('init'),
  actions: {
    dismissIntro() {
      get(this, 'currentUser.user').dismissWelcome();
    }
  }
});
