import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'capitolzen-client/config/environment';

const { APP: { API_HOST } } = ENV;

export default Controller.extend({
  ajax: service(),
  flashMessages: service(),
  actions: {
    resetPassword({ email }) {
      get(this, 'ajax')
        .request(`${API_HOST}/password`, {
          data: {
            email: email
          }
        })
        .then(() => {
          get(this, 'flashMessages').success(
            'Password reset link sent. Please check your email inbox shortly.'
          );
        })
        .catch(() => {
          get(this, 'flashMessages').danger(
            "We're sorry, an error occurred and our team has been notified."
          );
        });
    }
  }
});
