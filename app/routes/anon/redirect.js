import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';

export default Route.extend({
  session: service(),
  currentUser: service(),
  model({ token, p }) {
    if (!p) {
      this.transitionTo('not-found');
    }

    if (p && !token) {
      this.transitionTo('anon.page-access', p);
    }

    let authenticator = 'authenticator:jwt-login';
    return get(this, 'session')
      .authenticate(authenticator, token)
      .then(() => {
        console.log('sup');
        this.transitionTo('page', p);
      });
  }
});