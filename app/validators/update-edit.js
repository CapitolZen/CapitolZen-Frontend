import { validatePresence } from 'ember-changeset-validations/validators';

export default {
  title: [validatePresence(true)],
  author: [validatePresence(true)],
  published: [validatePresence(true)]
};
