import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import Route from '@ember/routing/route';
export default Route.extend({
  currentUser: service(),
  model() {
    return this.get('currentUser.organization');
  }
});
