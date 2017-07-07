import Ember from "ember";

const { computed } = Ember;
export default Ember.Component.extend({
  tagName: "ul",
  classNames: ["pagination", "justify-content-center"],
  maxPagerCount: 10,
  meta: null,
  page: null,
  currentPageRange: computed("meta.pagination.pages", "page", function() {
    let totalPages = this.get("meta.pagination.pages");
    let currentPage = this.get("page");
    let maxDisplay = this.get("maxPagerCount");
    let half = Math.round(maxDisplay / 2);
    if (totalPages < maxDisplay) {
      return [false, false];
    }

    let min = currentPage - half;
    min = min < 0 ? 0 : min;

    let max = currentPage + half;
    max = max > totalPages ? totalPages : max;

    if (min === 0) {
      max = maxDisplay;
    }
    return [min, max];
  }),
  currentPageMax: computed("currentPageRange", function() {
    return this.get("currentPageRange")[1];
  }),
  currentPageMin: computed("currentPageRange", "page", function() {
    return this.get("currentPageRange")[0];
  }),
  actions: {
    privateSetPage(page) {
      this.get("pageAction")(page);
    }
  }
});
