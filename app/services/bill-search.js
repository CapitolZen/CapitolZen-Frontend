import Ember from "ember";
import { task } from "ember-concurrency";

const { Service, get, set, inject: { service } } = Ember;

export default Service.extend({
  store: service(),
  query: "",
  queries: [],
  results: false,
  /**
   * @private
   */
  searchBills: task(function*(terms) {
    let results = yield get(this, "store").query("bill", { search: terms });
    set(this, "results", results);
  }).drop(),

  /**
   * @public
   */
  search(terms) {
    set(this, "query", terms);
    get(this, "queries").addObject(terms);
    get(this, "searchBills").perform(terms);
  }
});
