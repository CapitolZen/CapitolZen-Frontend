import Ember from 'ember';
import ENV from 'capitolzen-client/config/environment';

const { Controller, get, inject: { service } } = Ember;
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
