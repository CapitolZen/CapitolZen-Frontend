import Ember from 'ember';
import layout from '../../templates/components/invite/invite-summary';
const { Component, get, inject: { service } } = Ember;
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
