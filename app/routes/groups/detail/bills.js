import { A } from '@ember/array';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
export default Route.extend({
  model() {
    let { id } = this.paramsFor('groups.detail');
    return RSVP.hash({
      group: this.store.findRecord('group', id),
      wrappers: A()
    });
  }
});
