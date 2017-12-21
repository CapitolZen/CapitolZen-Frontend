import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { get } from '@ember/object';
import { A } from '@ember/array';

export default Route.extend({
  breadCrumb: {},

  model({ group }) {
    return RSVP.hash({
      group: this.store.findRecord('group', group)
    });
  },

  afterModel(model) {
    this.set('breadCrumb', {
      title: `Reports for ${get(model, 'group').get('title')}`
    });
  }
});
