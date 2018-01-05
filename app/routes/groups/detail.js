import RSVP from 'rsvp';
import Route from '@ember/routing/route';
export default Route.extend({
  breadCrumb: {
    title: 'clients'
  },
  model(params) {
    return this.store.findRecord('group', params.id);
  },

  afterModel(model) {
    this.set('breadCrumb', { title: model.get('title') });
  }
});
