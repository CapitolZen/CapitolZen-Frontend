import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['invite-summary'],
  actions: {
    deleteInvite(invite) {
      invite.destroyRecord();
    },
    inviteAction(invite, action) {
      let payload = {
        data: {
          type: 'invites',
          attributes: {
            actions: action,
          },
        },
      };
      invite.action(payload);
    },
  },
});
