import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
  titleDisplay: computed('value', 'row', function() {
    if (get(this, 'row.bill.id')) {
      return get(this, 'value');
    } else {
      return get(this, 'row.internalTitle');
    }
  })
});
