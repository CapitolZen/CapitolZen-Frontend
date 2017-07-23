import Ember from "ember";
import { task } from "ember-concurrency";
import moment from "moment";

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  model: Ember.Object.create(),
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  router: service("-routing"),
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
      let fields = data.getProperties("title", "description");
      fields.group = this.get("group");
      fields.user = this.get("currentUser.user");
      fields.organization = this.get("currentUser.organization");
      fields.publishDate = moment().unix();
      let report = this.get("store").createRecord("report", fields);
      report
        .save()
        .then(() => {
          this.get("flashMessages").success("Report Created");
          this.get("router").transitionTo("reports", this.get("group"));
        })
        .catch(err => {
          console.log(err);
        });
    },
    updatePublishDate(date) {}
  }
});
