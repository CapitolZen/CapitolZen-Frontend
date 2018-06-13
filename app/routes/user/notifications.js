import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service('current-user'),
  model() {
    return this.get('store').query('activity-group', {
      feed: 'user:current:notification'
    });
  }
});
