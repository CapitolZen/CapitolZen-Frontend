import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  ajax: service(),
  success: false,
  classNames: ['mt-5'],
  email: null,
  actions: {
    submit() {
      let payload = this.getProperties(['email', 'page']);
      let data = { email: payload.email, page: payload.page.id };
      this.get('ajax')
        .post('users/guest_login/', { data })
        .then(() => {
          this.get('flashMessages').success(
            'Check your email box for a link to login.'
          );
          this.set('success', true);
        })
        .catch(() => {
          this.get('flashMessages').danger(
            'An error has occurred and our team is notified.'
          );
        });
    }
  }
});
