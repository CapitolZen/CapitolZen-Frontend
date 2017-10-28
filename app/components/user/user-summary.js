import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  ajax: service(),
  classNames: ['list-group-item', 'd-flex', 'justify-content-between'],
  actions: {
    resetPassword() {
      let email = get(this, 'user.username');
      return get(this, 'ajax').post('users/reset_password_request/', {
        data: { email }
      });
    }
  }
});
