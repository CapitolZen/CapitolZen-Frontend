import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, RSVP } = Ember;

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
