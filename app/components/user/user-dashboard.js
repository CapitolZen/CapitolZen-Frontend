import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
import { filterBy } from '@ember/object/computed';
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
  actionList: filterBy('_actionsRaw', 'state', 'active'),
  groupList: computed(function() {
    if (isEmpty(get(this, 'userSavedGroups'))) {
      return get(this, 'queriedGroup');
    } else {
      return get(this, 'userSavedGroups');
    }
  }),
  fetchGroups: task(function*() {
    let groups = yield get(this, 'store').query('group', {
      active: true,
      user: get(this, 'currentUser.user_id'),
      sort: 'title'
    });
    set(this, 'queriedGroup', groups);
  }).on('init'),
  fetchActions: task(function*() {
    let actions = yield get(this, 'store').query('action', { state: 'active' });
    set(this, '_actionsRaw', actions);
  }).on('init'),
  actions: {
    dismissIntro() {
      get(this, 'currentUser.user').dismissWelcome();
    }
  }
});
