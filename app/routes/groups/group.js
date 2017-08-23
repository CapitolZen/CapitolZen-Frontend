import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Clients'
  },
  model(params) {
    return this.store.findRecord('group', params.id);
  },
  afterModel(model) {
    console.log(model.get('title'));
    this.set('breadCrumb', { title: model.get('title') });
  }
});
