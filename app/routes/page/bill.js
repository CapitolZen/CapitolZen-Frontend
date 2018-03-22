import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model({ id, wrapper }) {
    return hash({
      wrapper: this.store.findRecord('wrapper', wrapper),
      page: this.store.findRecord('page', id)
    });
  }
});
