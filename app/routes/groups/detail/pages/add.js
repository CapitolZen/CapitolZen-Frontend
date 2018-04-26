import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  currentUser: service(),
  model() {
    this.transitionTo('page-admin.add', {
      queryParams: { group: this.paramsFor('groups.detail.id') }
    });
  }
});
