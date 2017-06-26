import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {inject: {service}} = Ember;
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  model() {
    let current = this.get('currentUser.user');
    if (current) {
      return current;
    } else {
      return this.get('store').queryRecord('user', {currentUser: true});
    }
  }
});
