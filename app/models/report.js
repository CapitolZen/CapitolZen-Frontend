import DS from 'ember-data';
import Ember from 'ember';

const { computed, get, set } = Ember;
export default DS.Model.extend({
  user: DS.belongsTo('user'),
  organization: DS.belongsTo('organization'),
  group: DS.belongsTo('group'),
  wrappers: DS.hasMany('wrapper'),
  filter: DS.attr(),
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
  dynamicDateFilter: computed('filter', {
    set(key, value) {
      let filters = get(this, 'filter');
      filters.date_filter = value;
      set(this, 'filter', filters);
    },
    get() {
      return get(this, 'filter')['date_filter'];
    }
  }),
  updateFilter(key, value) {
    let filters = get(this, 'filter');
    filters[key] = value;
    set(this, 'filter', filters);
  }
});
