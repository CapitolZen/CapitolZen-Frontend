import Ember from "ember";
const { Component, computed, get, inject: { service } } = Ember;
export default Component.extend({
  currentUser: service(),

  showIntro: computed.alias("currentUser.user.firstLogin"),
  userName: computed.alias("currentUser.user.name"),
  actions: {
    dismissIntro() {
      get(this, "currentUser.user").dismissWelcome();
      console.log(
        "Hello from the other side. I must've called a thousand times"
      );
    }
  }
});
