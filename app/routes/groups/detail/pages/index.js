import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model() {
    let { id } = this.paramsFor('groups.detail');
    return hash({
      pages: this.store.query('page', { group: id }),
      group: this.store.findRecord('group', id)
    });
  },
  afterModel({ pages, group }) {
    if (!pages.length) {
      this.transitionTo('page-admin.add', {
        queryParams: { group: group.get('id') }
      });
    } else {
      return { pages, group };
    }
  }
});
