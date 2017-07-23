import Ember from "ember";

export default Ember.Route.extend({
  model() {
    let params = this.paramsFor("reports");
    return Ember.RSVP.hash({
      group: this.store.findRecord("group", params.group),
      reports: this.store.query("report", { group: params.group })
    });
  }
});
