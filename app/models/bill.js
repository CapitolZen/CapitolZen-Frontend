import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr("string"),
  sponsor: DS.attr("string"),
  state: DS.attr("string"),
  summary: DS.attr("string"),
  history: DS.attr(),
  stateId: DS.attr("string"),
  currentCommittee: DS.attr("string"),
  status: DS.attr("string"),
  affectedSecion: DS.attr("string"),
  lastActionDate: DS.attr("date"),
  remoteUrl: DS.attr("string")
});
