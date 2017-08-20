import DS from 'ember-data';

export default DS.Model.extend({
  actor: DS.attr('string'),
  verb: DS.attr('string'),
  origin: DS.attr('string'),
  target: DS.attr('string'),
  to: DS.attr(),
  time: DS.attr('date')
});
