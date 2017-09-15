import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  actions: {
    triggerChat() {
      get(this, 'dismiss')();
    },
    triggerFeedback() {
      get(this, 'dismiss')();
    }
  }
});
