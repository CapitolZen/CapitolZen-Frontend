import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  beforeModel() {
    let session = this.get('session');
    if (session.isAuthenticated) {
      this.transitionTo('anon.dashboard');
    } else {
      this.transitionTo('anon.register');
    }
  }
});
