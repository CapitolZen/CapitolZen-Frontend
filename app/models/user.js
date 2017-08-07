import Ember from "ember";
import DS from "ember-data";

const { computed, get, set } = Ember;

export default DS.Model.extend({
  username: DS.attr("string"),
  dateJoined: DS.attr("date"),
  name: DS.attr("string"),
  organizations: DS.hasMany("organization"),
  password: DS.attr("string"),
  meta: DS.attr(),
  firstLogin: computed("meta", function() {
    let meta = get(this, "meta");
    return !meta["hasViewedDashboard"];
  }),
  savedGroups: computed("meta", function() {
    return get(this, "meta.savedGroups");
  }),
  dismissWelcome() {
    set(this, "meta.hasViewedDashboard", true);
  }
});
