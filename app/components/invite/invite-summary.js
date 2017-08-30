import Ember from 'ember';
import layout from '../../templates/components/invite/invite-summary';

export default Ember.Component.extend({
  layout,
  actions: {
    deleteInvite(invite) {
      invite.destroyRecord();
    },
    inviteAction(invite, action) {
      invite.action(action);
    }
  }
});
