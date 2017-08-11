import Ember from "ember";
import { task } from "ember-concurrency";

const { Component, computed, get } = Ember;

export default Component.extend({
  totalActive: computed("users", function() {
    return get(this, "users").get("length");
  }),
  userSortDesc: ["name:desc"],
  sortedUsers: computed.sort("users", "userSortDesc")
});
