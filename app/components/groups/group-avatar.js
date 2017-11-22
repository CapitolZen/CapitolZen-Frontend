import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  hasPhoto: computed('value', function() {
    return !!get(this, 'value');
  })
});
