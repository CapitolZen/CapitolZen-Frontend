import {
  validatePresence,
  validateFormat,
  validateLength,
  validateConfirmation
} from 'ember-changeset-validations/validators';

export default {
  currentPassword: [validatePresence(true)],
  password: [validateLength({ min: 8 })],
  confirmPassword: validateConfirmation({ on: 'password' })
};
