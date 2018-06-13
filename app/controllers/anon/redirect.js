import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['p', 'u', 'token'],
  p: null,
  token: null,
  u: null
});
