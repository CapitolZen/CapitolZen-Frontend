import Ember from "ember";

export default Ember.Service.extend({
  pageTitleRaw: null,
  pageDescriptionRaw: null,

  pageTitle: Ember.computed("pageTitleRaw", function() {
    return this.get("pageTitleRaw");
  }),

  pageDescription: Ember.computed("pageDescriptionRaw", function() {
    return this.get("pageDescriptionRaw");
  })
});
