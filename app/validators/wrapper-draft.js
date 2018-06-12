import {
  validatePresence,
  validateInclusion
} from 'ember-changeset-validations/validators';

export default {
  internalTitle: [validatePresence({ presence: true })],
  group: [validatePresence({ presence: true })],
  position: [
    validateInclusion({ list: ['neutral', 'support', 'oppose'] }),
    validatePresence({ presence: true })
  ],
  summary: [validatePresence({ presence: true })],
  draftSponsor: [validatePresence({ presence: true })]
};
