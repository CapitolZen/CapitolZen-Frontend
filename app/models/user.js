import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  dateJoined: DS.attr('date'),
  name: DS.attr('string'),
  organizations: DS.hasMany('organization'),
  password: DS.attr('string')
});
