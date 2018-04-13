import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from '../config/environment';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  session: service(),
  contentType: 'application/json; charset=utf-8',

  host: computed(function() {
    return ENV.APP.API_HOST;
  }),

  headers: computed('session.data.authenticated.idToken', {
    get() {
      if (!this.get('session.isAuthenticated')) {
        return {};
      }
      let headers = {};
      this.get('session').authorize(
        'authorizer:application',
        (headerName, headerValue) => {
          headers[headerName] = headerValue;
        }
      );
      return headers;
    }
  })
});
