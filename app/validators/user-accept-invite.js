import {
  validatePresence,
  validateLength,
  validateConfirmation
} from 'ember-changeset-validations/validators';

export default {
  name: validatePresence({ presence: true }),
  password: [validateLength({ min: 8 })],
  confirm_password: validateConfirmation({ on: 'password' })
};
