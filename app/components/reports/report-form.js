import Ember from 'ember';
import { task } from 'ember-concurrency';
import moment from 'moment';

const { A, get, set, computed, Component, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  router: service('-routing'),
  model: false,
  group: null,
  wrapperList: [],
  useAllWrappers: true,
  report: false,
  selectedGroup: null,
  excludedWrappers: [],

  init() {
    this._super(...arguments);
    let m = get(this, 'model') || Ember.Object.create();
    set(this, 'model', m);
    let s = m.get('static') || false;
    set(this, 'isStatic', s);
    set(this, 'excludedWrappers', A());
    set(this, 'wrapperList', A());
  },

  enableGroupSearch: computed('groups', function() {
    let length = get(this, 'groups').length;

    return length >= 4;
  }),

  center: moment('2016-05-17'),
  range: {
    start: moment('2016-05-10'),
    end: moment('2016-05-15')
  },
  logoChoice: computed('m.filter', {
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
    let g = this.get('selectedGroup');
    try {
      let wrappers = yield this.get('store').query('wrapper', {
        group: g.id
      });
      this.set('wrapperList', wrappers);
    } catch (e) {
      console.log(e);
    }
  }).drop(),

  layoutOptions: [
    {
      label: 'Detailed List',
      value: 'detail_list'
    },
    {
      label: 'Plain List',
      value: 'plain_list'
    },
    {
      label: 'Detailed Table',
      value: 'detail_table'
    },
    {
      label: 'Plain Table',
      value: 'plain_table'
    }
  ],

  dynamicDateFilterOptions: [
    {
      label: 'Last 7 Days',
      arg: 'last_d_7'
    },
    {
      label: 'Last Month',
      arg: 'last_m_1'
    },
    {
      label: 'Last Quarter',
      arg: 'last_m_3'
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
      console.log(wrapper);
      get(this, 'excludedWrappers').pushObject(wrapper);
    },
    createReport(data) {
      let fields = data.getProperties(
        'title',
        'description',
        'layout',
        'static'
      );
      fields.group = get(this, 'selectedGroup');
      fields.user = get(this, 'currentUser.user');
      fields.organization = get(this, 'currentUser.organization');
      fields.publishDate = moment().unix();
      fields.preferences = { logo: get(data, 'logoChoice') };
      let report = this.get('store').createRecord('report', fields);
      report
        .save()
        .then(() => {
          this.get('flashMessages').success('Report Created');
          this.get('router').transitionTo('reports', this.get('group'));
        })
        .catch(err => {
          console.log(err);
        });
    },
    updatePublishDate(date) {}
  }
});
