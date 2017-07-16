import Ember from "ember";
const { A, Route, RSVP } = Ember;
export default Route.extend({
  model(params) {
    return RSVP.hash({
      group: this.store.findRecord("group", params.id),
      wrappers: A()
    });
  }
});
