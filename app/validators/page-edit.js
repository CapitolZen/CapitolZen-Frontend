import {
  validatePresence,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  title: [validatePresence(true)],
  author: [validatePresence(true)],
  visibility: [validatePresence(true)],
  published: [validatePresence(true)],
  description: [validateFormat({ allowBlank: true })]
};
