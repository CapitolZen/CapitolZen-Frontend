import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  Route,
  inject: {
    service
  }
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  session: service('session'),
  //organizations: service('organizations'),
  //uiGlobal: service('ui-global'),
  /**
  _loadCurrentOrganization() {
    return this.get('organizations').loadAll();
  },
  **/
});
