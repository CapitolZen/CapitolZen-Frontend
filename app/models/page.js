import DS from 'ember-data';

export default DS.Model.extend({
  group: DS.belongsTo('group', { async: false }),
  organization: DS.belongsTo('organization', { async: false }),
  author: DS.belongsTo('user', { async: false }),
  visibility: DS.attr('string', { defaultValue: 'organization' }),
  title: DS.attr('string'),
  description: DS.attr('string'),
  published: DS.attr('boolean'),
  created: DS.attr('string'),
  modified: DS.attr('string')
});
