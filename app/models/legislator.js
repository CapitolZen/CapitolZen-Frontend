import DS from 'ember-data';

export default DS.Model.extend({
  state: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  middleName: DS.attr('string'),
  suffixes: DS.attr('string'),
  party: DS.attr('string'),
  chamber: DS.attr('string'),
  fullName: DS.attr('string'),
  url: DS.attr('string'),
  photoUrl: DS.attr('string'),
  district: DS.attr('string')
});
