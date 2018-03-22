import Controller from '@ember/controller';
import { get } from '@ember/object';

export default Controller.extend({
  queryParams: ['p', 'u', 'token'],
  p: null,
  token: null,
  u: null
});
