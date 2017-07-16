import DS from "ember-data";

export default DS.Model.extend({
  bill: DS.belongsTo("bill"),
  group: DS.belongsTo("group"),
  organization: DS.belongsTo("organization"),
  notes: DS.attr(),
  position: DS.attr("string", { defaultValue: "neutral" }),
  starred: DS.attr("boolean", { defaultValue: false })
});
