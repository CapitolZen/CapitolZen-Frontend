import jwt from 'ember-simple-auth-token/authenticators/jwt';
import { task } from 'ember-concurrency';

export default jwt.extend({
  /**
   *
   */
  authenticate(oldToken) {
    return new Promise((resolve, reject) => {
      this.refreshAccessToken(oldToken)
        .then(response => {
          let tokenData = this.handleAuthResponse(response);
          resolve(tokenData);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
});
