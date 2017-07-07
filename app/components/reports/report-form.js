import Ember from "ember";
import { task } from "ember-concurrency";

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  model: Ember.Object.create(),
  store: service(),
  group: null,
  wrapperList: null,
  useAllWrappers: true,

  getWrappers: task(function*() {
    let wrappers = yield this.get("store").query("wrapper", {
      group: this.get("group")
    });

    this.set("wrapperList", wrappers);
  }),

  actions: {
    createReport(data) {
      console.log(data);
    },
    updatePublishDate(date) {}
  }
});
