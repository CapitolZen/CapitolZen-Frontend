import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  currentUser: service(),
  beforeModel() {
    this._super(...arguments);
    let role = this.get('currentUser.user.organization_role');
    if (role === 'Guest') {
      this.transitionTo('error-route');
    }
  }
});
