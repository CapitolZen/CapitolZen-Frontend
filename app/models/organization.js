import DS from 'ember-data';

import { memberAction } from 'ember-api-actions';

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
  avatar: DS.attr('string'),
  available_states: DS.attr(),

  //
  // Actions / Sub Routes
  billing: memberAction({ path: 'billing/', type: 'GET' }),
  updatesubscription: memberAction({
    path: 'update_subscription/',
    type: 'POST'
  })
});
