import Ember from "ember";
import Changeset from "ember-changeset";
import lookupValidator from "ember-changeset-validations";
import OrganizationValidations from "../../validators/organization";

const { inject: { service }, get, set, computed, Component, isEmpty } = Ember;

export default Component.extend({
  flashMessages: service(),
  isEditing: false,
  changeset: null,
  init() {
    this._super(...arguments);
    let org = get(this, "org") || {};
    set(this, "changeLogo", isEmpty(get(this, "org.logo")));
    this.changeset = new Changeset(
      org,
      lookupValidator(OrganizationValidations),
      OrganizationValidations
    );
  },

  changeLogo: false,
  logoName: computed({
    get() {
      let url = get(this, "org.logo");
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
    updateOrganization(changeset) {
      changeset.execute();
      changeset
        .save()
        .then(() => {
          get(this, "flashMessages").success("Organization Updated");
          set(this, "isEditing", false);
        })
        .catch(() => {
          console.log("uh oh...hot dog");
          get(this, "flashMessages").success("Error Creating Organization");
          get(this, "organization.errors").forEach(({ attribute, message }) => {
            changeset.pushErrors(attribute, message);
          });
        });
    },
    toggleEditing() {
      this.toggleProperty("isEditing");
    },
    handleResponse({ headers: { location } }) {
      let org = get(this, "org");
      org.set("logo", location);
      org.save().then(() => {
        set(this, "changeLogo", false);
        get(this, "flashMessages").success("Logo Updated");
      });
    },
    changeLogo() {
      this.toggleProperty("changeLogo");
    }
  }
});
