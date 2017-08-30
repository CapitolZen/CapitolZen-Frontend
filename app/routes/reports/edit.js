import Ember from 'ember';
const { RSVP, Route } = Ember;

export default Route.extend({
  model({ report }) {
    return RSVP.hash({
      report: this.store.findRecord('report', report),
      groups: this.store.findAll('group')
    });
  }
});
