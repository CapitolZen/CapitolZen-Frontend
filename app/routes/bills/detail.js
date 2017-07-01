import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      bill: this.store.findRecord('bill', params.id),
      wrappers: this.store.query('wrapper', {bill__id: params.id})
    });

  }
});
