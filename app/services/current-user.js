import CurrentUser from 'ember-junkdrawer/services/current-user';
import { inject as service } from '@ember/service';
import { get, set, setProperties, computed } from '@ember/object';
import { assert } from '@ember/debug';
import { A } from '@ember/array';

export default CurrentUser.extend({
  intercom: service(),
  metrics: service(),
  raven: service(),
  features: service(),
  flashMessages: service(),
  network: service(),
  fullStory: service(),

  init() {
    this._super(...arguments);
    let network = this.get('network');
    network.on('change', state => {
      let sticky = true;
      if (state === 'OFFLINE') {
        this.get('flashMessages').danger('Network disconnected!', { sticky });
      }

      if (state === 'RECONNECTING') {
        this.get('flashMessages').warning('Reconnecting');
      }

      if (state === 'ONLINE') {
        this.get('flashMessages').clearMessages();
        this.get('flashMessages').success('Reconnected!');
      }
    });
  },

  didSetupUser(user) {
    this.update();
    let data = {
      email: get(user, 'username'),
      id: get(user, 'id')
    };
    this.get('raven').callRaven('setUserContext', [data]);
    set(this, 'metrics.context.userId', get(user, 'id'));
    this.get('fullStory').identify(get(user, 'id'));
  },

  didSetupOrganization(organization) {
    let clientLabel = organization.get('clientLabel'),
      clientLabelPlural = organization.get('clientLabelPlural');
    set(this, 'features.clientLabel', clientLabel);
    set(this, 'features.clientLabelPlural', clientLabelPlural);
    set(this, 'metrics.context.orgId', get(organization, 'id'));
    this.update();
  },

  update() {
    set(this, 'intercom.user', get(this, 'intercomData'));
    get(this, 'metrics').identify('mixpanel', {
      distinctId: get(this, 'currentUser.user_id')
    });
  },

  intercomData: computed('currentUser', function() {
    return {
      name: this.get('currentUser.name'),
      email: this.get('currentUser.username'),
      user_id: this.get('currentUser.id'),
      user_is_admin: this.get('currentUser.user_is_admin'),
      user_is_staff: this.get('currentUser.user_is_staff'),
      company: {
        id: this.get('currentUser.currentOrganization.id'),
        name: this.get('currentUser.currentOrganization.name'),
        is_active: this.get('currentUser.currentOrganization.isActive')
      }
    };
  }),

  events: A([
    'report:create',
    'report:download',
    'event:calendar',
    'action:dismiss',
    'action:snoozed',
    'action:flagged',
    'wrapper:saved',
    'wrapper:comment',
    'committee:subscribed'
  ]),
  event(event) {
    assert(
      `${event} must be part of allowed events`,
      get(this, 'events').includes(event)
    );
    get(this, 'intercom').trackEvent(event);
    get(this, 'metrics').trackEvent({ event: event });
  }
});
