import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    const parent_params = this.paramsFor('groups.detail');
    return RSVP.hash({
      group: this.get('store').findRecord('group', parent_params.id),
      activities: this.get('store').query('activity', {
        feed: 'group:' + params.id + ':timeline'
      })
    });
  }
});
