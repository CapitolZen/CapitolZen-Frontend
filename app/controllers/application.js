import Ember from 'ember';
import ENV from 'capitolzen-client/config/environment';
const { Controller, computed, inject: { service }, get } = Ember;

export default Controller.extend({
  session: service(),
  isProduction: computed(function() {
    return ENV.environment === 'production';
  }),
  actions: {
    invalidateSession() {
      get(this, 'session').invalidate();
    }
  }
});
