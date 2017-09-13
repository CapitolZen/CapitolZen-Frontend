import Component from '@ember/component';
import { getWithDefault, computed, set, get } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Component.extend({
  classNames: ['row', 'mt-2'],
  today: moment(),
  queryBuilder: service(),
  init() {
    this._super(...arguments);
    let q = getWithDefault(this, 'filter', false);
    if (q) {
      let [key] = Object.keys(q);
      let parts = key.split('__');
      let op = parts.pop();
      key = parts.join('__');
      get(this, 'opts').forEach(o => {
        if (o.qvalue === key) {
          set(this, 'selectedQuery', o);
        }
      });

      get(this, 'operatorOptions').forEach(e => {
        if (e.value === op) {
          set(this, 'selectedOperator', e);
        }
      });

      let [value] = Object.values(q);
      set(this, 'selectedValue', value);
    }
  },
  operatorOptions: computed('selectedQuery', function() {
    if (get(this, 'selectedQuery')) {
      let { type } = get(this, 'selectedQuery');

      return get(this, 'queryBuilder').getOperatorOptions(type);
    }
    return [];
  }),
  selectedOperatorLabel: computed.alias('selectedOperator.label'),
  selectedQueryLabel: computed.alias('selectedQuery.label'),
  valueSelectorComponent: computed('selectedQuery', function() {
    if (get(this, 'selectedQuery')) {
      let { type, opts = false } = get(this, 'selectedQuery');
      return get(this, 'queryBuilder').valueElementGenerator(opts, type);
    }
  }),
  generatedQuery: computed(
    'selectedQuery',
    'selectedValue',
    'selectedOperator',
    function() {
      let query = get(this, 'selectedQuery'),
        val = get(this, 'selectedValue'),
        op = get(this, 'selectedOperator'),
        output = {};
      if (query && val && op) {
        output = get(this, 'queryBuilder').generateQuery(query, op, val);
      }
      return output;
    }
  ),
  actions: {
    addFilter() {
      set(this, 'isEditing', false);
      get(this, 'update')(get(this, 'generatedQuery'));
      if (get(this, 'isNew')) {
        set(this, 'selectedQuery', null);
        set(this, 'selectedValue', null);
        set(this, 'selectedOperator', null);
        set(this, 'isEditing', true);
      }
    },
    updateFilter() {
      get(this, 'update')(get(this, 'generatedQuery'));
      set(this, 'isEditing', false);
    },
    deleteFilter() {
      get(this, 'delete')(get(this, 'generatedQuery'));
      set(this, 'isEditing', false);
    }
  }
});
