import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';

export default Route.extend({
  session: service(),
  currentUser: service(),
  model({ token, p, u }) {
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
        if (u) {
          this.transitionTo('page.update', p, u);
        } else {
          this.transitionTo('page.updates', p);
        }
      });
  }
});
