import Ember from "ember";
const { inject: { service }, get, $ } = Ember;

export default Ember.Component.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  routing: service("-routing"),
  isEditing: false,
  toggleEnabled: true,
  init() {
    this.get("currentUser");
    this._super(...arguments);
  },
  actions: {
    handleResponse({ headers: { Location } }) {
      let model = get(this, "model");
      model.set("logo", Location);
      model.save();
    },
    saveGroup(group) {
      group.save();
    }
  }
});
