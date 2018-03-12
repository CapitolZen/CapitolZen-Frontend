import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Controller.extend({
  session: service(),
  queryParams: ['p', 'token'],
  p: null,
  token: null
});
