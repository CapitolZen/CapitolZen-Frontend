import Ember from "ember";

const { inject: { service }, Component, get, computed } = Ember;
export default Component.extend({
  store: service(),
  session: service(),
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

      if (password.length < 8 || confirmPassword !== password) {
        get(this, "flashMessages").danger("Please supply a valid password");
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
