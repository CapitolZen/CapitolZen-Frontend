import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { computed, set, get } from '@ember/object';
import ENV from 'capitolzen-client/config/environment';

export default Route.extend(ApplicationRouteMixin, {
  session: service(),
  currentUser: service(),
  flashMessages: service(),

  /**
   *
   */
  routeAfterAuthentication: computed(function() {
    if (this.get('currentUser.organizations.length')) {
      return 'dashboard';
    }
  }),

  /**
   *
   */
  beforeModel() {
    return this.get('currentUser')
      .initApp()
      .then(data => {
        if (data === 'invalidate' && this.get('session.isAuthenticated')) {
          this.get('session').invalidate();
          this.transitionTo('anon.login');
        }
      });
  },

  /**
   * After the user has been authenticated
   */
  sessionAuthenticated() {
    console.log('session authenticated');
    this.get('currentUser')
      .sessionAuthenticated()
      .then(() => {
        if (this.get('currentUser.user')) {
          this.transitionTo(this.get('routeAfterAuthentication'));
        }
      });
  },

  actions: {
    /**
     * @param error
     * @param transition
     */
    error(error, transition) {
      if (error.errors) {
        console.error(error.errors);
        if (ENV.environment === 'production') {
          if (parseInt(error.errors[0].status) == 404) {
            this.transitionTo('not-found');
          } else {
            this.transitionTo('error-route');
          }
        }
      }
    }
  }
});
