import Ember from "ember";
const { RSVP, Route } = Ember;
export default Route.extend({
  model({ report }) {
    let { group } = this.paramsFor("reports");
    return RSVP.hash({
      report: this.store.findRecord("report", report),
      group: this.store.findRecord("group", group)
    });
  }
});
