import { getWithDefault, set, get, computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  organization: DS.belongsTo('organization'),
  group: DS.belongsTo('group'),
  //filter: DS.attr('query'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  attachments: DS.attr(),
  status: DS.attr('string', { defaultValue: 'published' }),
  displayType: DS.attr('string'),
  created: DS.attr('date'),
  modified: DS.attr('date'),
  preferences: DS.attr(),

  published: computed({
    get() {
      return get(this, 'status') === 'published';
    },
    set(key, value) {
      if (value) {
        set(this, 'status', 'published');
      } else {
        set(this, 'status', 'draft');
      }
    }
  }),

  downloadUrl: computed(function() {
    return this.get('attachments')['output-url'].url || false;
  }),
  layout: computed('preferences.layout', {
    get() {
      let value = getWithDefault(this, 'preferences.layout', 'detail_list');
      let opts = layoutOptions.find(l => {
        return l.value === value;
      });
      return opts;
    },
    set(key, obj) {
      let { value } = obj;
      let pref = getWithDefault(this, 'preferences', {});
      set(pref, 'layout', value);
      set(this, 'preferences', pref);
      return obj;
    }
  }),

  updateFilter(key, value) {
    let filters = getWithDefault(this, 'filter', {});
    filters[key] = value;
    set(this, 'filter', filters);
    this.notifyPropertyChange('filter');
  },
  deleteFilter(key) {
    let filters = getWithDefault(this, 'filter', false);
    if (filters) {
      delete filters[key];
    }
    set(this, 'filter', filters);
    this.notifyPropertyChange('filter');
  }
});

const layoutOptions = [
  {
    label: 'Detailed List',
    value: 'detail_list'
  },
  {
    label: 'Detailed Table',
    value: 'detail_table'
  },
  {
    label: 'Plain Table',
    value: 'simple_table'
  }
];
