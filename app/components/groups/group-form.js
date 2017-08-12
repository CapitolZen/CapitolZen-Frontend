import Ember from "ember";
const { inject: { service }, get, set, Component, computed, isEmpty } = Ember;

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

    set(this, "changeLogo", isEmpty(get(this, "model.logo")));
  },
  logoName: computed({
    get() {
      let url = get(this, "model.logo");

      if (!url || get(this, "changeLogo")) {
        return false;
      }
      url = decodeURIComponent(url);
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
    handleResponse({ headers: { location } }) {
      debugger;
      let model = get(this, "model");
      model.set("logo", location);
      set(this, "changeLogo", false);
      set(this, "logoName", location);
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
