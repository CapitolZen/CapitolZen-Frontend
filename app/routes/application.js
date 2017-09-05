import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser();
  },

  _loadCurrentUser() {
    return this.get('currentUser')
      .load()
      .catch(() => {
        this.get('session').invalidate();
      });
  },
  actions: {
    error(error, transition) {
      if (error.errors) {
        if (parseInt(error.errors[0].status) == 404) {
          this.transitionTo('not-found');
        } else {
          this.transitionTo('error-route');
        }
      }
    }
  }
});
