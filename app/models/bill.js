import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  sponsor: DS.attr('string'),
  state: DS.attr('string'),
  summary: DS.attr('string'),
  history: DS.attr('string'),
  stateId: DS.attr('string'),
  committee: DS.attr('string')
});
