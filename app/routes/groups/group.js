import Ember from 'ember';
const { RSVP, Route } = Ember;
export default Route.extend({
  breadCrumb: {
    title: 'Clients'
  },

  model(params) {
    return this.store.findRecord('group', params.id);
  },
  afterModel(model) {
    this.set('breadCrumb', { title: model.get('title') });
  }
});
