import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  model({ id }) {
    return hash({
      updates: this.store.query('update', { groupPage: id }),
      page: this.store.findRecord('page', id)
    });
  },
  afterModel({ updates }) {
    let obj = updates.get('firstObject');
    this.transitionTo('page.update', obj.get('id'));
  }
});
