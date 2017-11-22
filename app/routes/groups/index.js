import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';
import { A } from '@ember/array';

export default Route.extend(AuthenticatedRouteMixin, {
  breadCrumb: {
    title: 'Clients'
  },
  model() {
    return this.store.findAll('group', { filter: { sort: 'title' } });
  }
});
