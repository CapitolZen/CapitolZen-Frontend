import Ember from "ember";
const { computed, observer, Component, get } = Ember;
export default Component.extend({
  tagName: "span",
  classNames: ["badge"],
  classNameBindings: ["badgeModifier"],
  party: computed.alias("legislator.party"),
  badgeModifier: "badge-default",
  badgeModifierObserver: observer("party", function() {
    let party = get(this, "party");
    if (party) {
      party = party.toLowerCase();
    }
    switch (party) {
      case "republican":
        return "badge-republican";
      case "democrat":
        return "badge-democrat";
      case "green":
        return "badge-success";
      default:
        return "badge-default";
    }
  })
});
