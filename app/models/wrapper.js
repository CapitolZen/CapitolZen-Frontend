import DS from 'ember-data';

export default DS.Model.extend({
  bill: DS.belongsTo('bill'),
  groups: DS.attr(),
  organization: DS.belongsTo('organization'),
  notes: DS.attr()
});
