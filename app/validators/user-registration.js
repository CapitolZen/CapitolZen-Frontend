import {
  validatePresence,
  validateFormat,
  validateLength,
  validateConfirmation
} from 'ember-changeset-validations/validators';

export default {
  name: [validatePresence(true)],
  username: validateFormat({
    type: 'email',
    message: 'Must be a valid email address'
  }),

  password: [validateLength({ min: 8 })],
  confirmPassword: validateConfirmation({ on: 'password' })
};
