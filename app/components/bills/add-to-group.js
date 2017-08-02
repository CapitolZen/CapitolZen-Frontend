import Ember from "ember";
import { task, hash } from "ember-concurrency";

const { inject: { service }, get, set, RSVP } = Ember;

export default Ember.Component.extend({
  store: service(),
  currentUser: service(),
  classNames: ["w-100"],
  groupList: null,
  bill: null,
  buttonSize: false,
  displayText: true,
  buttonText: "Add to Group",
  buttonType: "secondary",
  menuAlign: "left",
  listGroups: task(function*() {
    let bill = get(this, "bill");

    let storeHash = {
      wrappers: get(this, "store").query("wrapper", {
        bill__state_id: bill.get("stateId"),
        bill__state: bill.get("state")
      }),
      groups: get(this, "store").findAll("group")
    };

    let { wrappers, groups } = yield hash(storeHash);

    let wrapperGroupIds = wrappers.map(w => {
      return get(w, "group.id");
    });

    if (wrapperGroupIds.length && groups.length) {
      let filteredList = [];
      groups.forEach(g => {
        if (wrapperGroupIds.indexOf(g.get("id")) < 0) {
          filteredList.push(g);
        }
      });
      console.log(filteredList);
      set(this, "groupList", filteredList);
    } else {
      console.log("sup");
      set(this, "groupList", groups);
    }
  }),
  addBillToGroup: task(function*(group) {
    let bill = get(this, "bill");
    console.log(group);
    console.log(group.get("id"));
    let wrapper = yield this.get("store").query("wrapper", {
      bill__state_id: bill.get("stateId"),
      bill__state: bill.get("state"),
      group: group.get("id")
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
