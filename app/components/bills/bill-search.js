import Ember from "ember";
import { task } from "ember-concurrency";

const { inject: { service }, Component, computed, get } = Ember;
export default Component.extend({
  billSearch: service(),
  results: computed.alias("billSearch.results"),
  currentQuery: computed.alias("billSearch.query"),
  actions: {
    search() {
      let term = get(this, "currentQuery");
      get(this, "billSearch").search(term);
    }
  }
});
