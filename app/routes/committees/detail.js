import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { hash } from 'rsvp';
export default Route.extend({
  model({ id }) {
    return hash({
      array: A(),
      id: id,
      committee: this.store.findRecord('committee', id)
    });
  }
});
