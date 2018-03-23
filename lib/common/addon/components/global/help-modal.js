import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import layout from '../../templates/components/global/help-modal';

export default Component.extend({
  layout,
  tagName: '',
  intercom: service(),
  dismiss() {
    this.set('open', false);
  },
  actions: {
    triggerChat() {
      get(this, 'intercom').showMessages();
      this.dismiss();
    },
    triggerFeedback() {
      this.dismiss();
      UserSnap.start();
    }
  }
});
