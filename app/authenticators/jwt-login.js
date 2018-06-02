import jwt from 'ember-simple-auth-token/authenticators/jwt';
import { inject as service } from '@ember/service';

export default jwt.extend({
  session: service(),
  /**
   *
   */
  authenticate(oldToken) {
    let { page_id } = this.getTokenData(oldToken);
    this.get('session').set('data.currentPageId', page_id);
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
