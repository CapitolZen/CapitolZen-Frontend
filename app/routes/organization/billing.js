import Ember from "ember";
const { inject: { service }, get, Route } = Ember;
export default Route.extend({
  currentUser: service(),
  model() {
    return get(this, "currentUser").loadOrganization();
  }
});
