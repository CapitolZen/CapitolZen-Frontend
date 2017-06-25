import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  isActive: DS.attr('boolean'),
  userIsOwner: DS.attr('boolean'),
  demographicOrgType: DS.attr('string'),
  billingName: DS.attr('string'),
  billingEmail: DS.attr('string'),
  billingPhone: DS.attr('string'),
  billingAddressOne: DS.attr('string'),
  billingAddressTwo: DS.attr('string'),
  billingCity: DS.attr('string'),
  billingState: DS.attr('string'),
  billingZipCode: DS.attr('string'),
  planType: DS.attr('string')
});
