import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  ajax: service(),
  success: false,
  classNames: ['mt-5'],
  email: null,
  actions: {
    submit() {
      let payload = this.getProperties(['email', 'page']);
      this.get('ajax')
        .post('users/reset_password_request/', { data: payload })
        .then(() => {
          this.get('flashMessages').success(
            'Check your email box for a link to login.'
          );
          this.set('success', true);
        })
        .catch(e => {
          console.log(e);
          this.get('flashMessages').danger(
            'An error has occurred and our team is notified.'
          );
        });
    }
  }
});
