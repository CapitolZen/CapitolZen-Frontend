import {
  validatePresence,
  validateFormat,
  validateNumber,
  validateLength
} from 'ember-changeset-validations/validators';

export default {
  title: [validatePresence({ presence: true }), validateLength({ max: 40 })]
};
