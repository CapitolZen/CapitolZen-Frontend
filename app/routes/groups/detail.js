import Ember from "ember";

export default Ember.Route.extend({
  beforeModel({ id }) {
    this.transitionTo("groups.bills", id);
  },
  model(params) {
    return this.get("store").findRecord("group", params.id);
  }
});
