import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  session: service('session'),
  beforeModel() {
    let session = this.get('session');
    if (session.isAuthenticated) {
      this.transitionTo('anon.dashboard');
    } else {
      this.transitionTo('anon.register');
    }
  }
});
