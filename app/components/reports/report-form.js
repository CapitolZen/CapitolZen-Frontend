import Ember from 'ember';
import { task } from 'ember-concurrency';
import moment from 'moment';

const {
  A,
  merge,
  get,
  set,
  computed,
  Component,
  getWithDefault,
  inject: { service }
} = Ember;

export default Component.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  router: service('-routing'),
  model: false,
  wrapperList: [],
  useAllWrappers: true,
  report: false,
  excludedWrappers: [],
  filterList: computed('model.filter', function() {
    let filter = getWithDefault(this, 'model.filter', {});
    let output = [];
    let keys = Object.keys(filter);
    keys.forEach(k => {
      let obj = {};
      obj[k] = filter[k];
      output.push(obj);
    });
    return output;
  }),
  isStatic: computed.alias('model.isStatic'),
  init() {
    this._super(...arguments);
    let m, g;
    if (get(this, 'model')) {
      m = get(this, 'model');
      g = get(m, 'group');
      set(this, 'selectedGroup', g);
      get(this, 'getWrappers').perform();
    } else {
      set(this, 'model', get(this, 'store').createRecord('report'));
      set(this, 'isStatic', false);
      set(this, 'excludedWrappers', A());
      set(this, 'wrapperList', A());
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    let model = get(this, 'model');
    if (model.get('isNew')) {
      model.deleteRecord();
    }
  },

  enableGroupSearch: computed('groups', function() {
    let length = get(this, 'groups').length;

    return length >= 4;
  }),
  availableRelationships: ['bill'],
  logoChoice: computed('m.preferences', {
    get(key) {
      return get(this, 'model').get('logoChoice');
    },
    set(key, value) {
      let m = get(this, 'model');
      set(m, 'logoChoice', value);
      return value;
    }
  }),

  wrapperPreviewList: computed(
    'wrapperList',
    'excludedWrappers.[]',
    'selectedGroup',
    function() {
      let wrappers = get(this, 'wrapperList');
      let excluded = get(this, 'excludedWrappers');
      wrappers.removeObjects(excluded);
      return wrappers;
    }
  ),
  getWrappers: task(function*() {
    let g = getWithDefault(this, 'selectedGroup', false);

    if (!g) {
      g = get(this, 'groups.firstObject');
      set(this, 'selectedGroup', g);
    }

    let filter = getWithDefault(this, 'model.filter', {});
    let query = { group: g.id };
    merge(query, filter);
    try {
      let wrappers = yield this.get('store').query('wrapper', query);
      this.set('wrapperList', wrappers);
    } catch (e) {
      console.log(e);
    }
  }).drop(),
  selectedLayout: computed('preferences', {
    get() {
      let d = get(this, 'layoutOptions')[0];
      return getWithDefault(this, 'model.layout', d);
    },
    set(key, value) {
      console.log(value);
      return value;
    }
  }),
  layoutOptions: [
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
  ],

  filterOptions: [
    {
      label: 'Bill Title',
      qvalue: 'bill__title',
      type: 'string'
    },
    {
      label: 'Introduced Date',
      qvalue: 'bill__introduced_date',
      type: 'date'
    },
    {
      label: 'Last Action Date',
      qvalue: 'bill__last_action_date',
      type: 'date'
    },
    {
      label: 'Sponsor Name',
      qvalue: 'bill__sponsor__full_name',
      type: 'string'
    },
    {
      label: 'Sponsor Party',
      qvalue: 'bill__sponsor__party',
      type: 'string'
    },
    {
      label: 'Summary',
      qvalue: 'summary',
      type: 'string'
    },
    {
      label: 'Position',
      qvalue: 'position',
      type: 'array',
      opts: ['support', 'oppose', 'neutral']
    }
  ],

  actions: {
    updateGroup(mut, group) {
      set(this, 'selectedGroup', group);
      get(this, 'getWrappers').perform();
    },
    setReportType(mut, value) {
      set(this, 'isStatic', value);
    },
    removeWrapper(wrapper) {
      get(this, 'excludedWrappers').pushObject(wrapper);
    },
    updateFilterItem(update) {
      let model = get(this, 'model');
      let [key] = Object.keys(update);
      model.updateFilter(key, update[key]);
      get(this, 'getWrappers').perform();
    },
    createReport(data) {
      let fields = data.getProperties('title', 'description', 'static');
      fields.group = get(this, 'selectedGroup');
      fields.user = get(this, 'currentUser.user');
      fields.organization = get(this, 'currentUser.organization');
      fields.publishDate = moment().unix();
      let { value } = get(data, 'layout');
      fields.preferences = {
        logo: get(data, 'logoChoice'),
        layout: value
      };
      let report = get(this, 'model');
      report.setProperties(fields);
      let msg = 'Report updated!';
      if (report.get('isNew')) {
        msg = 'Report created!';
      }
      report
        .save()
        .then(() => {
          this.get('flashMessages').success(msg);
          this.get('router').transitionTo('reports');
          set(this, 'isSubmitting', true);
        })
        .catch(err => {
          console.log(err);
          set(this, 'isSubmitting', false);
        });
    },
    updatePublishDate(date) {}
  }
});
