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
    get(key) {
      return (
        get(this, 'preferences.layout') || {
          label: 'Detailed List',
          value: 'detail_list'
        }
      );
    },
    set(key, value) {
      let pref = get(this, 'preferences') || {};
      pref.layout = value;
      set(this, 'preferences', pref);
    }
  }),

  updateFilter(key, value) {
    let filters = getWithDefault(this, 'filter', {});
    filters[key] = value;
    set(this, 'filter', filters);
  }
});
