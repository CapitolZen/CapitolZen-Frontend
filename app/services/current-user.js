import Ember from 'ember';
import { task } from 'ember-concurrency';
const {
  inject:
      { service },
  get,
  set,
  computed
  } = Ember;

export default Ember.Service.extend({
  ajax: service(),
  session: service(),
  store: service(),
  user: null,
  organization: null,

  email: computed('user.username', function() {
    return get(this, 'user.username');
  }),
  id: computed('user.id', function() {
    return get(this, 'user.id');
  }),
  name: computed('user.name', function () {
    return get(this, 'user.name')
  }),
  orgName: computed('organization.name', function() {
    return get(this, 'organization.name')
  }),
  orgId: computed('organization.id', function() {
    let org = get(this, 'organization');
    return org.get('id');
  }),

  /**
   * @private
   */
  getServerData: task(function * () {
      let user = yield get(this, 'store').queryRecord('user', {currentUser: true});
      let org = yield get(user, 'organizations');
      org = org.get('firstObject');
      set(this, 'user', user);
      set(this, 'organization', org);
  }).drop(),

  /**
   * Load Current User into store/service
   * @public
   */
  load() {
    if (get(this, 'session.isAuthenticated')) {
      try {
        get(this, 'getServerData').perform()
        return true
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  }


});
