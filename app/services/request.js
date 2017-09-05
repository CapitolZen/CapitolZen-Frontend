import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'capitolzen-client/config/environment';

const { APP: { API_HOST } } = ENV;

export default AjaxService.extend({
  session: service(),
  contentType: 'application/json; charset=utf-8',
  host: API_HOST,
  trustedHosts: [API_HOST],
  headers: computed('session.data.authenticated.data.token', function() {
    let headers = {};
    headers.Authorization = `Bearer ${this.get(
      'session.data.authenticated.data.token'
    )}`;
    return headers;
  })
});
