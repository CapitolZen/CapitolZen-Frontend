import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model({ id }) {
    return hash({
      updates: this.store.query('update', { group_page: id }),
      page: this.store.findRecord('page', id)
    });
  },
  afterModel(model) {
    this.transitionTo('page.update', model.get('updates.firstObject.id'));
  }
});
