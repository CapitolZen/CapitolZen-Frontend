import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let params = this.paramsFor('reports');
    return this.store.findRecord('group', params.group)
  }
});
