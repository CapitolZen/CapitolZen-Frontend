import RSVP from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model({ report }) {
    return RSVP.hash({
      report: this.store.findRecord('report', report),
      groups: this.store.findAll('group')
    });
  }
});
