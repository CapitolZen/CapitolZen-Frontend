import Component from '@ember/component';
import DateFilter from '../../../mixins/date-filter';
import { getWithDefault, get, set, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import moment from 'moment';

export default Component.extend(DateFilter, {
  init() {
    this._super(...arguments);
    let value = getWithDefault(this, 'value', false);
    if (value) {
      let [key] = Object.keys(value);
      let parts = key.split('bill__action_dates__');
      let inputs = parts[1].split('__');
      set(this, 'lookupKey', inputs[0]);

      let filterDates = value[key].split(',');
      set(this, 'dateFilters.startDate', moment(filterDates[0]));
      set(this, 'dateFilters.endDate', moment(filterDates[1]));
    }
  },
  dateKey: computed('lookupKey', {
    get() {
      let key = getWithDefault(this, 'lookupKey', 'first');
      return key === 'first' ? 'introduced' : 'active';
    },
    set(key, value) {
      let val = value === 'introduced' ? 'first' : 'last';
      set(this, 'lookupKey', val);
      return value;
    }
  }),
  rangeString: computed(function() {
    return `${get(
      this,
      'dateFilters.startDate'
    ).toISOString()},${get(this, 'dateFilters.endDate').toISOString()}`;
  }),
  outputKey: computed('lookupKey', 'lookupOperator', function() {
    let key = getWithDefault(this, 'lookupKey', 'first');

    return `bill__action_dates__${key}__range`;
  }),
  actions: {
    save() {
      let output = {},
        key = get(this, 'outputKey');
      output[key] = get(this, 'rangeString');
      get(this, 'update')(output);
    }
  }
});
