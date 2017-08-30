import Ember from 'ember';
const { Component, get, inject: { service } } = Ember;

export default Component.extend({
  flashMessages: service(),
  classNames: ['invite-summary'],

  actions: {
    deleteInvite(invite) {
      invite.destroyRecord().then(() => {
        get(this, 'flashMessages').success('Invitation Revoked');
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
