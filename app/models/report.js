import DS from "ember-data";

export default DS.Model.extend({
  user: DS.belongsTo("user"),
  organization: DS.belongsTo("organization"),
  group: DS.belongsTo("group"),
  wrappers: DS.hasMany("wrapper"),
  title: DS.attr("string"),
  description: DS.attr("string"),
  attachments: DS.attr(),
  scheduled: DS.attr("boolean"),
  publishDate: DS.attr("date")
});
