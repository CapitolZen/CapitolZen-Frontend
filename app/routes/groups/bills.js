import Ember from 'ember';
const { RSVP } = Ember;
export default Ember.Route.extend({
  model(params) {
    return RSVP.hash({
      group: this.store.findRecord('group', params.id),
      wrappers: this.store.query('wrapper', {group: params.id})
    })
  }
});
