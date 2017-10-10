import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service('current-user'),
  model(params) {
    return this.get('currentUser.user');
  }
});
