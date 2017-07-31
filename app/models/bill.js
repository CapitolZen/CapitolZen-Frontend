import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr("string"),
  sponsor: DS.belongsTo("legislator"),
  state: DS.attr("string"),
  stateId: DS.attr("string"),
  history: DS.attr(),
  documents: DS.attr(),
  status: DS.attr("string"),
  chamber: DS.attr("string"),
  actionDates: DS.attr(),
  lastActionDate: DS.attr("date"),
  type: DS.attr("string"),
  sources: DS.attr(),
  cosponsors: DS.attr(),
  votes: DS.attr()
});
