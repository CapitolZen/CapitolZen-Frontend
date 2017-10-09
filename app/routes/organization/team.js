import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service('current-user'),
  model(params) {
    return RSVP.hash({
      organization: this.get('store').findRecord(
        'organization',
        this.get('currentUser.organization.id')
      ),
      invites: this.get('store').query('invite', {
        filter: {
          organization: this.get('currentUser.organization.id'),
          status: 'unclaimed'
        }
      }),
      users: this.get('store').query('user', {
        filter: {
          organization: this.get('currentUser.organization.id')
        }
      })
    });
  },
  actions: {
    refreshUserInvites() {
      this.refresh();
    }
  }
});
