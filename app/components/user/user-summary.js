import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  ajax: service(),
  currentUser: service('current-user'),
  classNames: [
    'user-summary',
    'list-group-item',
    'd-flex',
    'justify-content-between'
  ],

  userCanEdit: computed('user', 'currentUser.user', function() {
    if (this.get('currentUser.user.id') === this.get('user.id')) {
      return false;
    }

    if (this.get('currentUser.user.organization_role') === 'Member') {
      return false;
    }

    return true;
  }),

  actions: {
    switchRole(user, role) {
      let payload = {
        data: {
          type: 'users',
          attributes: {
            role: role
          }
        }
      };

      user.change_organization_role(payload).then(() => {
        user.reload();
      });
    },

    switchAccountStatus(user, status) {
      let payload = {
        data: {
          type: 'users',
          attributes: {
            status: status
          }
        }
      };

      user.change_status(payload).then(() => {
        user.reload();
      });
    }
  }
});
