import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  uiGlobal: service('ui-global'),
  beforeModel() {
    this.set('uiGlobal.wrapperSize', 'half');
  },
  model() {
    return this.get('store').queryRecord('user', { currentUser: true });
  }
});
