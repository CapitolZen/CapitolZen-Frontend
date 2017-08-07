import Ember from "ember";

const { inject: { service }, Component, get, computed } = Ember;
export default Component.extend({
  store: service(),
  session: service(),
  router: service("-routing"),
  flashMessages: service(),
  defaultObject: Ember.Object.create(),
  actions: {
    register(user) {
      let {
        email: username,
        password,
        confirmPassword,
        name,
        organizationName
      } = user;

      if (password.length < 8) {
        get(this, "flashMessages").danger(
          "Please provide a password with at least 8 characters."
        );
      }

      if (confirmPassword !== password) {
        get(this, "flashMessages").danger("Password doesn't match!");
      } else {
        let newUser = get(this, "store").createRecord("user", {
          username: username,
          password: password,
          name: name
        });
        newUser.save().then(() => {
          get(this, "session")
            .authenticate("authenticator:jwt", {
              identification: username,
              password: password
            })
            .then(() => {
              let newOrg = get(this, "store").createRecord("organization", {
                name: organizationName
              });
              newOrg.save();
            });
        });
      }
    }
  }
});
