import {
  validatePresence,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  name: [
    validatePresence(true)
  ],
  username: validateFormat({type: 'email'})
}