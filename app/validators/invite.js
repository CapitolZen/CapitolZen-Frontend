import {
  validateLength,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  name: validateLength({ max: 50 }),
  email: [validateFormat({ type: 'email' }), validateLength({ max: 254 })]
};
