import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  group: DS.belongsTo('group'),
  organization: DS.belongsTo('organization'),
  page: DS.belongsTo('page'),
  files: DS.hasMany('files'),
  links: DS.hasMany('links'),
  wrappers: DS.hasMany('wrappers'),
  reports: DS.hasMany('reports'),
  document: DS.attr(),
  title: DS.attr('string'),
  published: DS.attr('boolean', { defaultValue: true })
});
