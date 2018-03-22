import Controller from '@ember/controller';
import { get } from '@ember/object';

export default Controller.extend({
  queryParams: ['p', 'token'],
  p: null,
  token: null
});
