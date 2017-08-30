import Ember from 'ember';
const { Route, RSVP, get, set } = Ember;
export default Route.extend({
  breadCrumb: {},
  model({ bill }) {
    return RSVP.hash({
      group: this.modelFor('groups.bill'),
      wrapper: this.store.findRecord('wrapper', bill)
    });
  },
  afterModel({ wrapper }) {
    let bill = wrapper.get('bill');
    let title = bill.get('stateId');
    set(this, 'breadCrumb', { title: title });
  }
});
