import DS from 'ember-data';

export default DS.Model.extend({
  bill: DS.belongsTo('bill'),
  group: DS.belongsTo('group'),
  organization: DS.belongsTo('organization'),
  notes: DS.attr()
});
