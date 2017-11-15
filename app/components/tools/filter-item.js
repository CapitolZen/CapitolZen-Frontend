import Component from '@ember/component';
import { getWithDefault, computed, set, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { A } from '@ember/array';
import moment from 'moment';

export default Component.extend({
  classNames: ['row', 'mt-2'],
  today: moment(),
  isEditing: false,
  init() {
    this._super(...arguments);
    let value = getWithDefault(this, 'value', false);
    if (value) {
      let [key] = Object.keys(value);
      let types = A(get(this, 'filterTypes'));
      let type = types.find(item => {
        return key.endsWith(item.keyend);
      });
      set(this, 'queryType', type);
    }
  },
  filterTypes: [
    {
      label: 'Sponsor Party',
      component: 'tools/-query/sponsor-party',
      keyend: 'party'
    },
    {
      label: 'Committee',
      component: 'tools/-query/current-committee',
      keyend: 'committee'
    },
    {
      label: 'Date Range - Dynamic',
      component: 'tools/-query/dynamic-date-range',
      keyend: 'te'
    },
    {
      label: 'Date Range - Static',
      component: 'tools/-query/static-date-range',
      keyend: '__range'
    },
    {
      label: 'Keyword',
      component: 'tools/-query/keyword-query',
      keyend: '_title__icontains'
    },
    {
      label: 'Client Position',
      component: 'tools/-query/client-position',
      keyend: 'position'
    }
  ],
  queryType: null,
  selectedComponent: alias('queryType.component'),
  actions: {
    updateValue(value) {
      set(this, 'isEditing', false);
      set(this, 'isNew', true);
      get(this, 'update')(value);
    },
    deleteValue(value) {
      if (!value) {
        value = get(this, 'value');
      }
      get(this, 'delete')(value);
    }
  }
});
