import Ember from 'ember';
import { task } from 'ember-concurrency';
import moment from 'moment';

const { get, set, computed, Component, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  router: service('-routing'),
  model: false,
  group: null,
  wrapperList: null,
  useAllWrappers: true,

  init() {
    this._super(...arguments);
    let m = get(this, 'model') || Ember.Object.create();
    set(this, 'model', m);
  },
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
      return value;
    }
  }),
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

  dateOption: 'dynamic',
  dateFilterField: 'last_action_date',
  dateOptionHelp: computed('dateOption', function() {
    let opt = get(this, 'dateOption');
    switch (opt) {
      case 'static':
        return 'Static dates will filter all bills against this date. When this report is created, this date will remain fixed.';
      case 'dynamic':
        return 'Dynamic dates will always filter bills against this period of time.';
    }
  }),
  getWrappers: task(function*() {
    let g = this.get('group');
    try {
      let wrappers = yield this.get('store').query('wrapper', {
        group: g.id
      });
      this.set('wrapperList', wrappers);
    } catch (e) {
      console.log(e);
    }
  }).on('init'),

  actions: {
    createReport(data) {
      let fields = data.getProperties('title', 'description');
      fields.group = get(this, 'group');
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
