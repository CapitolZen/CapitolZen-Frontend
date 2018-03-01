import {
  validatePresence,
  validateLength,
  validateFormat,
  validateInclusion
} from 'ember-changeset-validations/validators';

export default {
  summary: [validatePresence({ presence: true })],
  position: [validateFormat({ allowBlank: true })],
  firstNote: [validateFormat({ allowBlank: true })]
};
