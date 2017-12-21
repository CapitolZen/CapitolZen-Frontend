import {
  validatePresence,
  validateLength,
  validateFormat,
  validateInclusion
} from 'ember-changeset-validations/validators';

export default {
  group: [validatePresence({ presence: true })],
  bill: [validateFormat({ allowBlank: true })]
};
