import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import RSVP from 'rsvp';

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),
  flashMessages: service(),

  /**
   *
   */
  beforeModel() {
    return RSVP.all([
      this._loadCurrentUser().catch(() => {
        this.get('session').invalidate();
        this.get('flashMessages').danger(
          'An error occurred loading your account.'
        );
        this.transitionTo('login');
      })
    ]);
  },

  /**
   *
   */
  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().catch(() => {
      this.get('session').invalidate();
      this.get('flashMessages').danger(
        'An error occurred loading your account.'
      );
      this.transitionTo('login');
    });
  },

  /**
   * @private
   */
  _loadCurrentUser() {
    return this.get('currentUser').load();
  },

  actions: {
    /**
     *
     * @param error
     * @param transition
     */
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
