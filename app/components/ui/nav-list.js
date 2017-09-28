import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service(),
  actions: {
    triggerLink() {
      get(this, 'dismiss')();
    },
    invalidateSession() {
      get(this, 'session').invalidate();
    }
  }
});
