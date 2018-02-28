import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend({
  ajax: service(),
  model({ id }) {
    return hash({
      bill: this.store.findRecord('bill', id),
      votes: get(this, 'ajax')
        .request(`bills/${id}/votes/`)
        .then(response => {
          return response.data.data;
        })
    });
  }
});
