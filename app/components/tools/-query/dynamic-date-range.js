import Component from '@ember/component';
import { getWithDefault, get, set, computed } from '@ember/object';

export default Component.extend({
  init() {
    this._super(...arguments);
    let value = getWithDefault(this, 'value', false);
    let [key] = Object.keys(value);
    if (key) {
      let parts = key.split('bill__action_dates__');
      console.log(parts);
      if (parts.length > 1) {
        let inputs = parts[1].split('__');
        set(this, 'lookupKey', inputs[0]);
        set(this, 'lookupOperator', inputs[1]);
        set(this, 'filterValue', value[key]);
      }
    }
  },
  outputKey: computed('lookupKey', 'lookupOperator', function() {
    let key = getWithDefault(this, 'lookupKey', 'first'),
      operator = getWithDefault(this, 'lookupOperator', 'gte');

    return `bill__action_dates__${key}__${operator}`;
  }),
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
  operator: computed('lookupOperator', {
    get() {
      let operator = getWithDefault(this, 'lookupOperator', 'gte');
      return operator === 'gte' ? 'newer' : 'older';
    },
    set(key, value) {
      let op = value === 'older' ? 'lte' : 'gte';
      set(this, 'lookupOperator', op);
      return value;
    }
  }),
  valueLabel: computed('filterValue', {
    get() {
      let val = get(this, 'filterValue');
      if (!val) {
        return 'month';
      }
      return val.match(/\{(.*?)\}/)[1];
    },
    set(key, value) {
      set(this, 'filterValue', `{${value}}`);
      return value;
    }
  }),
  propertyOptions: ['introduced', 'active'],
  operatorOptions: ['older', 'newer'],
  valueOptions: ['week', 'month', 'quarter'],
  actions: {
    save() {
      let output = {};
      let key = get(this, 'outputKey');
      output[key] = getWithDefault(this, 'filterValue', '{week}');
      get(this, 'update')(output);
    }
  }
});
