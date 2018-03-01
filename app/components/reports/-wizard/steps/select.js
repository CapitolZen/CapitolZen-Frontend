import Component from '@ember/component';
import { get, getWithDefault, set, computed } from '@ember/object';

export default Component.extend({
  previewComponent: computed('reportType', function() {
    return `reports/-types/${get(this, 'reportType')}`;
  }),
  actions: {
    setSubject(subject) {
      set(this, 'reportType', subject);
    },
    next() {
      get(this, 'onComplete')(get(this, 'step'), {
        reportType: get(this, 'reportType')
      });
    }
  }
});
