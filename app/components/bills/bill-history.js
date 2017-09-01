import Ember from 'ember';
import moment from 'moment';

const { Component, computed, get } = Ember;
export default Component.extend({
  sortedHistory: computed.sort('bill.history', function(a, b) {
    if (get(a, 'date') === get(b, 'date')) {
      return 0;
    } else if (get(a, 'date') < get(b, 'date')) {
      return 1;
    } else {
      return -1;
    }
  })
});
