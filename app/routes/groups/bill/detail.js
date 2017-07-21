import Ember from "ember";
const { Route, RSVP } = Ember;
export default Route.extend({
  model({ bill }) {
    return RSVP.hash({
      group: this.modelFor("groups.bill"),
      wrapper: this.store.findRecord("wrapper", bill)
    });
  }
});
