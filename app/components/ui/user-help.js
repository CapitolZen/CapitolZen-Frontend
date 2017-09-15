import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  intercom: service(),
  actions: {
    triggerChat() {
      get(this, 'intercom').showMessages();
      get(this, 'dismiss')();
    },
    triggerFeedback() {
      get(this, 'intercom').showNewMessage();
      get(this, 'dismiss')();
    }
  }
});
