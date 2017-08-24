import Ember from 'ember';

const { Route } = Ember;
export default Route.extend({
  model({ group }) {
    return Ember.RSVP.hash({
      group: this.store.findRecord('group', group),
      reports: this.store.query('report', { group: group })
    });
  }
});
