import Base from './base';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Base.extend({
  currentUser: service(),
  event: alias('action.event'),
  actions: {
    trackEvent() {
      this.get('currentUser.event')('event:calendar');
    }
  }
});
