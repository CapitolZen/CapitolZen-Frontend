import Ember from "ember";
const { computed, Component, inject: { service } } = Ember;
export default Component.extend({
  flashMessages: service(),
  bill: computed.alias("wrapper.bill")
});
