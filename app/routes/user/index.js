import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  uiGlobal: service('ui-global'),
  beforeModel() {
    this.set('uiGlobal.wrapperSize', 'half');
  },
  model() {
    return this.get('store').queryRecord('user', { currentUser: true });
  }
});
