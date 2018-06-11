import {
  validateLength,
  validateConfirmation
} from 'ember-changeset-validations/validators';

export default {
  password: [validateLength({ min: 8 })],
  confirm_password: validateConfirmation({ on: 'password' })
};
