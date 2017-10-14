import {
  validatePresence,
  validateFormat,
  validateLength,
  validateConfirmation
} from 'ember-changeset-validations/validators';

export default {
  current_password: [validatePresence(true)],
  password: [validateLength({ min: 8 })],
  confirm_password: validateConfirmation({ on: 'password' })
};
