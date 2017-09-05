import Ember from 'ember';

const { inject: { service }, computed } = Ember;
export default Ember.Component.extend({
  session: service(),
  currentUser: service(),
  isAuthenticated: computed('session.isAuthenticated', function() {
    return this.get('session.isAuthenticated');
  }),
  organization: computed(
    'currentUser.organization',
    'isAuthenticated',
    function() {
      if (this.get('isAuthenticated')) {
        return this.get('currentUser.organization');
      } else {
        return false;
      }
    }
  ),
  user: computed('isAuthenticated', function() {
    if (this.get('isAuthenticated')) {
      return this.get('currentUser.user');
    } else {
      return false;
    }
  }),
  userName: computed('isAuthenticated', function() {
    if (this.get('isAuthenticated')) {
      return this.get('user.name');
    } else {
      return false;
    }
  }),
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
