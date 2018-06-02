import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from '../config/environment';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  session: service(),
  currentUser: service(),
  contentType: 'application/json; charset=utf-8',

  host: computed(function() {
    return ENV.APP.API_HOST;
  }),

  headers: computed(
    'session.data.authenticated.data.token',
    'currentUser.organization.id',
    function() {
      let headers = {};
      headers.Authorization = `Bearer ${this.get(
        'session.data.authenticated.data.token'
      )}`;

      if (this.get('currentUser.organization.id')) {
        headers['X-Organization'] = this.get('currentUser.organization.id');
      }
      return headers;
    }
  )
});
