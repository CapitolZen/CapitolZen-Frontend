import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import layout from '../../templates/components/invite/invite-summary';
export default Component.extend({
  layout,
  flashMessages: service(),
  actions: {
    deleteInvite(invite) {
      invite.destroyRecord().then(() => {
        get(this, 'flashMessages').success('Invitation Revoked');
      });
    },
    inviteAction(invite, action) {
      invite.action({ action });
    }
  }
});
