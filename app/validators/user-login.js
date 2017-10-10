import {
  validatePresence,
  validateLength,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  identification: [
    validateFormat({ type: 'email', message: 'Must be a valid email address' }),
    validateLength({ max: 254 })
  ],
  password: [validatePresence(true), validateLength({ min: 4 })]
};
