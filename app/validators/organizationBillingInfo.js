import {
  validatePresence,
  validateFormat,
  validateNumber,
  validateLength
} from 'ember-changeset-validations/validators';

export default {
  billing_name: [
    validatePresence({ presence: true }),
    validateLength({ max: 50 })
  ],
  billing_email: [
    validateFormat({ type: 'email' }),
    validateLength({ max: 60 })
  ],
  billing_phone: validateFormat({ type: 'phone' }),
  billing_address_one: validatePresence({ presence: true }),
  billing_address_two: validateFormat({ allowBlank: true }),
  billing_zip_code: [
    validateNumber({ integer: true }),
    validateLength({ is: 5 })
  ],
  billing_state: [
    validatePresence({ presence: true }),
    validateLength({ min: 2, max: 14 })
  ],
  billing_city: validatePresence({ presence: true })
};
