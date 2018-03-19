import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  beforeModel(...args) {
    this._super(...arguments);

    console.log(args);
  },
  model({ id }) {
    console.log('sup');
    return hash({
      updates: this.store.query('update', { group_page: id }),
      page: this.store.findRecord('page', id)
    });
  },
  sessionAuthenticated(...args) {
    console.log(args);
  }
});
