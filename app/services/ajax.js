import Ember from 'ember';
import ENV from '../config/environment';
import AjaxService from 'ember-ajax/services/ajax';

const { computed, inject: { service } } = Ember;

export default AjaxService.extend({
  session: service(),
  contentType: 'application/json; charset=utf-8',

  host: computed(function() {
    return ENV.APP.API_HOST;
  })
});
