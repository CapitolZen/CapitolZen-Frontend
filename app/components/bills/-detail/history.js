import { sort } from '@ember/object/computed';
import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  sortedHistory: sort('bill.history', function(a, b) {
    if (get(a, 'date') === get(b, 'date')) {
      return 0;
    } else if (get(a, 'date') < get(b, 'date')) {
      return 1;
    } else {
      return -1;
    }
  })
});
