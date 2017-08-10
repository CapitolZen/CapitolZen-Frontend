import Ember from "ember";

const { inject: { service }, Route } = Ember;
export default Route.extend({
  currentUser: service(),
  model() {
    return this.get("currentUser").loadOrganization();
  }
});
