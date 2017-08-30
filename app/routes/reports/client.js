import Ember from 'ember';

const { Route, RSVP, get } = Ember;
export default Route.extend({
  breadCrumb: {},
  model({ group }) {
    return RSVP.hash({
      group: this.store.findRecord('group', group),
      reports: this.store.query('report', { group: group }),
    });
  },
  afterModel(model) {
    this.set('breadCrumb', {
      title: `Reports for ${get(model, 'group').get('title')}`,
    });
  },
});
