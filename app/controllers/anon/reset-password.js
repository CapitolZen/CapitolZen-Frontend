import Ember from 'ember';
import ENV from 'capitolzen-client/config/environment';

const { get, Controller, inject: { service } } = Ember;
const { APP: { API_HOST } } = ENV;

export default Controller.extend({
  ajax: service(),
  flashMessages: service(),
  session: service(),
  actions: {
    resetPassword({ password, confirm }) {
      let { hash } = get(this, 'token');
      if (password.length < 8 || password !== confirm) {
        get(this, 'flashMessages').danger(
          'Please make sure your password matches'
        );
      } else {
        get(this, 'ajax')
          .post(`${API_HOST}/password`, {
            data: {
              hash,
              password
            },
            contentType: 'application/json'
          })
          .then(res => {
            console.log(res.data.email);
            let authenticator = 'authenticator:jwt';
            let creds = {
              identification: res.data.email,
              password: password
            };

            get(this, 'session')
              .authenticate(authenticator, creds)
              .then(() => {
                this.transitionToRoute('dashboard');
              });
          })
          .catch(() => {
            get(this, 'flashMessages').danger(
              'An error occured Please try again.'
            );
          });
      }
    }
  }
});
