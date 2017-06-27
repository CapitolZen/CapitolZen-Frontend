import {
  validatePresence,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  name: [
    validatePresence(true)
  ],
  billingName: [
    validatePresence(true)
  ],
  billingEmail: validateFormat({type: 'email'}),
  billingPhone: validateFormat({type: 'phone'}),
  billingCity: validatePresence(true),
  billingAddressOne: validatePresence(true),
  billingAddressTwo: validatePresence({allowBlank: true}),
  billingState: validatePresence(true),
  billingZipCode: validatePresence(true),
  planType: validatePresence({allowBlank: true})
}