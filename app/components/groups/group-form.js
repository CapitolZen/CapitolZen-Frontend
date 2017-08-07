import Ember from "ember";
const { inject: { service }, get, set, Component, computed } = Ember;

export default Component.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  routing: service("-routing"),
  isEditing: false,
  toggleEnabled: true,
  changeLogo: false,
  init() {
    this.get("currentUser");
    this._super(...arguments);
  },
  logoName: computed({
    get() {
      let url = get(this, "model.logo");
      url = decodeURIComponent(url);
      if (!url || get(this, "changeLogo")) {
        return false;
      }
      let peices = url.split("/");
      return peices.pop();
    },
    set(key, val) {
      let url = decodeURIComponent(val);
      let pieces = url.split("/");
      return pieces.pop();
    }
  }),
  actions: {
    handleResponse({ headers: { Location } }) {
      let model = get(this, "model");
      model.set("logo", Location);
      set(this, "changeLogo", false);
      set(this, "logoName", Location);
    },
    changeLogo() {
      this.toggleProperty("changeLogo");
    },
    saveGroup(group) {
      group.save().then(() => {
        get(this, "flashMessages").success("Group Updated!");
      });
    },
    saveGroupToUser() {}
  }
});
