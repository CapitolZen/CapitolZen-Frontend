import DS from 'ember-data';

export default DS.Model.extend({
  page: DS.belongsTo('page'),
  group: DS.belongsTo('group'),
  created: DS.attr('string'),
  modified: DS.attr('string'),
  url: DS.attr('string'),
  scrapedData: DS.attr()
});
