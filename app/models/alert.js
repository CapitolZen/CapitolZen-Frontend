import DS from "ember-data";

export default DS.Model.extend({
  user: DS.belongsTo("user"),
  isRead: DS.attr("boolean"),
  message: DS.attr("string"),
  references: DS.attr()
});
