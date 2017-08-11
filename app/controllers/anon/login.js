import Ember from "ember";
const { get, inject: { service }, Controller } = Ember;

export default Controller.extend({
  session: service(),
  flashMessages: service(),
  actions: {
    login(user) {
      let data = user.getProperties("identification", "password"),
        authenticator = "authenticator:jwt";

      this.get("session")
        .authenticate(authenticator, data)
        .then(() => {
          this.transitionToRoute("dashboard");
        })
        .catch(() => {
          get(this, "flashMessages").danger(
            "Your email or password was incorrect. Please try again."
          );
        });
    }
  }
});
