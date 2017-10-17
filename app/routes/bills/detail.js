import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return hash({
      bill: this.store.findRecord('bill', params.id),
      wrappers: this.store.query('wrapper', { bill_id: params.id })
    });
  }
});
