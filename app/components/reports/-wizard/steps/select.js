import Component from '@ember/component';
import { get, set, computed } from '@ember/object';

export default Component.extend({
  onComplete() {},
  actions: {
    setSubject(subject) {
      get(this, 'onComplete')(1, { reportType: subject });
    }
  }
});
