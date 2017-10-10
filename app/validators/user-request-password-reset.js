import {
  validateLength,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  email: [
    validateFormat({ type: 'email', message: 'Must be a valid email address' }),
    validateLength({ max: 254 })
  ]
};
