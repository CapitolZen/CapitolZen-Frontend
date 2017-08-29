import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  session: service('session'),
  currentUser: service('current-user'),
  beforeModel() {
    return this.get('currentUser').load();
  }
});
