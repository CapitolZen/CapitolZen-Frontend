import DS from "ember-data";
import Ember from "ember";

const { computed } = Ember;
export default DS.Model.extend({
  user: DS.belongsTo("user"),
  organization: DS.belongsTo("organization"),
  group: DS.belongsTo("group"),
  wrappers: DS.hasMany("wrapper"),
  filter: DS.attr(),
  title: DS.attr("string"),
  description: DS.attr("string"),
  attachments: DS.attr(),
  scheduled: DS.attr("boolean"),
  publishDate: DS.attr("date"),
  downloadUrl: computed(function() {
    return this.get("attachments")["output-url"].url || false;
  })
});
