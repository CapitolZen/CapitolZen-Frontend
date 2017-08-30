import Ember from 'ember';

const {
  Service,
  inject: { service },
  isEmpty,
  RSVP,
  get,
  set,
  computed,
  assert
} = Ember;

export default Service.extend({
  session: service(),
  store: service(),
  features: service(),
  intercom: service(),
  flashMessages: service(),
  currentUser: null,
  currentOrganization: null,
  isInitialized: false,

  user: computed('currentUser', function() {
    return this.get('currentUser');
  }),

  organization: computed('currentOrganization', function() {
    return this.get('currentOrganization');
  }),

  /**
   * We can only load the user from the backend once the session is setup
   * and we've got a user_id to find.
   * @public
   * @returns {*|Promise|Promise.<TResult>}
   */
  load() {
    let userId = this.get('session.data.authenticated.profile.user_id');
    const self = this;
    if (!isEmpty(userId)) {
      userId = userId.replace('auth0|', 'auth0-');
      return this.get('store')
        .query('user', { username: userId })
        .then(users => {
          const user = users.get('firstObject');

          if (!user) {
            this.get('flashMessages').danger('Unable to load user');
            return false;
          }

          this.set('currentUser', user);
          this._set_active_organization();
          this._set_user_features();
          self.set('isInitialized', true);

          let intercomData = {
            name: this.currentUser.get('provider_info.nickname'),
            email: this.currentUser.get('provider_info.email'),
            user_is_admin: this.currentUser.get('user_is_admin'),
            user_is_staff: this.currentUser.get('user_is_staff'),
            created: this.currentUser.get('provider_info.created-at'),
            email_verified: this.currentUser.get('provider_info.email-verified')
          };
          // set current user as the intercom user
          get(this, 'intercom').set('user', intercomData);
        });
    } else {
      return Ember.RSVP.resolve();
    }
  },

  /**
   * Ensures current user is loaded in `beforeModel()` hook in app.route
   * @return {Promise}
   */
  initSession() {
    return new Promise((resolve, reject) => {
      this.load()
        .then(resolve)
        .catch(reject);
    });
  },

  /**
   * @private
   * Select Active Organization
   */
  _set_active_organization() {
    const self = this;
    return new RSVP.Promise((resolve, reject) => {
      get(this, 'currentUser.organizations')
        .then(organizations => {
          const first = organizations.get('firstObject');
          if (first) {
            set(this, 'currentOrganization', first);
          }
          self._set_organization_features();
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  },

  /**
   * @private
   * Set User Features
   */
  _set_user_features() {
    //
    // Setup User Features.
    if (this.get('currentUser.user_is_staff')) {
      this.get('features').enable('admin-admin');
    } else {
      this.get('features').disable('admin-admin');
    }
  },

  /**
   * @private
   * Set Organization Features
   */
  _set_organization_features() {
    //
    // Set organization features.
    if (
      this.get('currentOrganization.features') &&
      this.get('currentOrganization.features').length
    ) {
      for (let feature in this.get('currentOrganization.features')) {
        this.get('features').enable('organization-' + feature);
      }
    }

    const map = {
      user_is_owner: 'organization-owner',
      user_is_admin: 'organization-admin',
      user_is_member: 'organization-member'
    };

    for (let [key, value] of Object.entries(map)) {
      if (this.get('currentOrganization').get(key)) {
        this.get('features').enable(value);
      } else {
        this.get('features').disable(value);
      }
    }
  },

  /**
   * List of pre-approved events for intercom event tracking
   */
  eventList: ['testEvent'],

  /**
   * Track an event in intercom
   * @public
   * @param event
   * @param args
   */
  trigger(event, args) {
    assert(
      'Must use pre-approved event, please do not create your own',
      get(this, 'eventList').includes(event)
    );

    get(this, 'intercom').trackEvent(event, args);
  }
});
