import Component from '@ember/component';

import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  amount: computed('value', function() {
    return this.get('value') / 100;
  })
});
