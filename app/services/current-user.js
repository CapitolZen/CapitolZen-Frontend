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

  didSetupUser(user) {
    this.update();
    let data = {
      email: get(user, 'username'),
      id: get(user, 'id')
    };
    get(this, 'raven').callRaven('setUserContext', [data]);
    set(this, 'metrics.context.userId', get(user, 'id'));
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
      name: get(this, 'currentUser.name'),
      email: get(this, 'currentUser.username'),
      user_id: get(this, 'currentUser.id'),
      user_is_admin: get(this, 'currentUser.user_is_admin'),
      user_is_staff: get(this, 'currentUser.user_is_staff'),
      company: {
        id: get(this, 'currentUser.currentOrganization.id'),
        name: get(this, 'currentUser.currentOrganization.name'),
        is_active: get(this, 'currentUser.currentOrganization.isActive')
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
