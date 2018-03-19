import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { alias } from '@ember/object/computed';

import InViewportMixin from 'ember-in-viewport';
export default Component.extend(InViewportMixin, {
  didEnterViewport() {
    if (get(this, 'onEnterViewport')) {
      get(this, 'onEnterViewport')(get(this, 'action'));
    }
  },
  componentType: computed('action', function() {
    let modelType = get(this, 'action.referencedModelType');
    return `actions/-types/${modelType}`;
  }),
  // Noop
  onDismiss() {},
  actions: {
    dismiss() {
      get(this, 'onDismiss')(get(this, 'action'));
    }
  }
});
