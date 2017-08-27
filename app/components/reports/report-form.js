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
  wrapperList: [],
  useAllWrappers: true,
  report: false,
  selectedGroup: null,
  excludedWrappers: [],
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
      set(this, 'model', Ember.Object.create());
      set(this, 'isStatic', false);
      set(this, 'excludedWrappers', A());
      set(this, 'wrapperList', A());
    }
  },

  enableGroupSearch: computed('groups', function() {
    let length = get(this, 'groups').length;

    return length >= 4;
  }),
  availableRelationships: ['bill'],
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
      qvalue: 'bill__sponsor__full_name',
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
      console.log(wrapper);
      get(this, 'excludedWrappers').pushObject(wrapper);
    },
    updateFilterItem(filter) {
      console.log(filter);
    },
    createReport(data) {
      let fields = data.getProperties('title', 'description', 'static');
      fields.group = get(this, 'selectedGroup');
      fields.user = get(this, 'currentUser.user');
      fields.organization = get(this, 'currentUser.organization');
      fields.publishDate = moment().unix();
      let { label, value } = get(data, 'layout');
      fields.preferences = {
        logo: get(data, 'logoChoice'),
        layout: { label, value }
      };
      let report = this.get('store').createRecord('report', fields);
      console.log(report);
      debugger;
      report
        .save()
        .then(() => {
          this.get('flashMessages').success('Report Created');
          this.get('router').transitionTo('reports');
        })
        .catch(err => {
          console.log(err);
        });
    },
    updatePublishDate(date) {}
  }
});
