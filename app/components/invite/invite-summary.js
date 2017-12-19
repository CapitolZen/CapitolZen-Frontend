import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  classNames: [
    'invite-summary',
    'list-group-item',
    'd-flex',
    'justify-content-between'
  ],
  actions: {
    deleteInvite(invite) {
      invite.destroyRecord().then(() => {
        get(this, 'flashMessages').success('Invitation Revoked');
        this.get('parentComponent')._resetDataset();
      });
    },

    inviteAction(invite, action) {
      let payload = {
        data: {
          type: 'invites',
          attributes: {
            actions: action
          }
        }
      };
      invite.action(payload);
    }
  }
});
