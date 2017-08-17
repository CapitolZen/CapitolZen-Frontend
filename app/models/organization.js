import DS from 'ember-data';

export default DS.Model.extend({
  created: DS.attr('date'),
  modified: DS.attr('date'),
  metadata: DS.attr(),

  name: DS.attr('string'),
  isActive: DS.attr('boolean'),
  userIsOwner: DS.attr('boolean'),
  billing_name: DS.attr('string'),
  billing_email: DS.attr('string'),
  billing_phone: DS.attr('string'),
  billing_address_one: DS.attr('string'),
  billing_address_two: DS.attr('string'),
  billing_city: DS.attr('string'),
  billing_state: DS.attr('string'),
  billing_zip_code: DS.attr('string'),
  planType: DS.attr('string'),
  logo: DS.attr('string')
});
