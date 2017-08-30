import DS from 'ember-data';
import Ember from 'ember';

const { computed, get, set, getWithDefault } = Ember;
export default DS.Model.extend({
  user: DS.belongsTo('user'),
  organization: DS.belongsTo('organization'),
  group: DS.belongsTo('group'),
  wrappers: DS.hasMany('wrapper'),
  static: DS.attr('boolean', { defaultValue: false }),
  filter: DS.attr('query'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  attachments: DS.attr(),
  scheduled: DS.attr('boolean'),
  publishDate: DS.attr('date'),
  created: DS.attr('date'),
  downloadUrl: computed(function() {
    return this.get('attachments')['output-url'].url || false;
  }),
  preferences: DS.attr(),
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
    },
  }),

  updateFilter(key, value) {
    let filters = getWithDefault(this, 'filter', {});
    filters[key] = value;
    set(this, 'filter', filters);
  },
});

const layoutOptions = [
  {
    label: 'Detailed List',
    value: 'detail_list',
  },
  {
    label: 'Detailed Table',
    value: 'detail_table',
  },
  {
    label: 'Plain Table',
    value: 'simple_table',
  },
];
