import Ember from "ember";
const { RSVP, Route, get, inject: { service } } = Ember;
export default Route.extend({
  currentUser: service(),
  model() {
    return RSVP.hash({
      organization: get(this, "currentUser").loadOrganization(),
      users: get(this, "store").findAll("user"),
      invites: get(this, "store").findAll("invite")
    });
  }
});
