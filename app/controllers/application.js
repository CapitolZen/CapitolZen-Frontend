import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import ENV from 'capitolzen-client/config/environment';

export default Controller.extend({
  currentUser: service('current-user'),
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
