import DS from 'ember-data';

export default DS.Model.extend({
  group: DS.belongsTo('group'),
  organization: DS.belongsTo('organization'),
  author: DS.belongsTo('user'),
  visibility: DS.attr('string', { defaultValue: 'organization' }),
  title: DS.attr('string'),
  description: DS.attr('string'),
  published: DS.attr('boolean'),
  created: DS.attr('string'),
  modified: DS.attr('string')
});
