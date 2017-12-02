import CurrentUser from 'ember-junkdrawer/services/current-user';
import { inject as service } from '@ember/service';
import { get, set, computed } from '@ember/object';
import { assert } from '@ember/debug';
import { A } from '@ember/array';

export default CurrentUser.extend({
  intercom: service(),
  didSetupUser() {
    this.update();
  },
  didSetupOrganization() {
    this.update();
  },
  update() {
    get(this, 'intercom').set('user', get(this, 'intercomData'));
  },

  intercomData: computed(function() {
    return {
      name: get(this, 'currentUser.name'),
      email: get(this, 'currentUser.username'),
      user_id: get(this, 'currentUser.user_id'),
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
    'event:download',
    'action:dismiss',
    'action:snoozed',
    'action:flagged'
  ]),
  trigger(event) {
    assert(
      `${event} must be part of allowed events`,
      get(this, 'events').contains(event)
    );
    get(this, 'intercom.trackEvent')(event);
  }
});
