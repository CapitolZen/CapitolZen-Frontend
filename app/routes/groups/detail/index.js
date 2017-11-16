import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { A } from '@ember/array';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  model(params) {
    const parent_params = this.paramsFor('groups.detail');
    return RSVP.hash({
      group: this.get('store').findRecord('group', parent_params.id),
      activities: this.get('store').query('activity', {
        feed: 'group:' + params.id + ':timeline'
      }),
      organization: get(this, 'currentUser.currentOrganization'),
      wrappers: A(),
      reports: this.store.query('report', { group: parent_params.id })
    });
  }
});
