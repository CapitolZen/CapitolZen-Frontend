import Component from '@ember/component';
import { computed } from '@ember/object';

const card = Component.extend({
  file: null,
  url: computed('file.previewSrc', function() {
    if (this.get('file.previewSrc')) {
      return this.get('file.previewSrc');
    } else {
      return '/assets/images/default-placeholder.png';
    }
  })
});

card.reopenClass({
  positionalParams: ['file']
});

export default card;
