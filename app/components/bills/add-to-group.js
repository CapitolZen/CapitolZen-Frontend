import Ember from "ember";
import { task } from "ember-concurrency";

const { inject: { service }, get, set } = Ember;

export default Ember.Component.extend({
  store: service(),
  currentUser: service(),
  classNames: ["w-100"],
  groupList: null,
  bill: null,
  buttonSize: false,
  buttonType: "secondary",
  listGroups: task(function*() {
    let groups = yield get(this, "store").findAll("group");
    set(this, "groupList", groups);
  }),
  addBillToGroup: task(function*(group) {
    let bill = get(this, "bill");
    let wrapper = yield this.get("store").query("wrapper", {
      bill__state_id: bill.get("stateId"),
      bill__state: bill.get("state")
    });

    if (!wrapper.get("length")) {
      wrapper = this.get("store").createRecord("wrapper", {
        bill: get(this, "bill"),
        group: group,
        organization: get(this, "currentUser.organization")
      });
      wrapper.save();
    }
  }),
  actions: {
    toggleActive() {
      get(this, "listGroups").perform();
    }
  }
});
