import DS from "ember-data";

export default DS.Model.extend({
  email: DS.attr("string"),
  organization: DS.belongsTo("organization"),
  created: DS.attr("date"),
  user: DS.belongsTo("user"),
  status: DS.attr("string", { defaultValue: "unclaimed" }),
  organizationName: DS.attr("string")
});
