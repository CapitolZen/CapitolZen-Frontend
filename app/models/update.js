import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user', { async: false }),
  group: DS.belongsTo('group', { async: false }),
  organization: DS.belongsTo('organization', { async: false }),
  page: DS.belongsTo('page', { async: false }),
  files: DS.hasMany('files', { async: false }),
  links: DS.hasMany('links'),
  wrappers: DS.hasMany('wrappers', { async: false }),
  reports: DS.hasMany('reports'),
  document: DS.attr(),
  title: DS.attr('string'),
  published: DS.attr('boolean', { defaultValue: true })
});
