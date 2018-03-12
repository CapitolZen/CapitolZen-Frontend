import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  currentUser: service(),
  beforeModel(transition) {
    this._super(...arguments);
    if (this.get('currentUser.user.organization_role') === 'guest') {
      this.transitionTo('not-found');
    }
  }
});
