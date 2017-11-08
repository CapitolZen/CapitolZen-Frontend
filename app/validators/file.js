import {
  validatePresence,
  validateLength,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  name: [validatePresence({ presence: true }), validateLength({ max: 255 })],
  description: [validateFormat({ allowBlank: true })]
};
