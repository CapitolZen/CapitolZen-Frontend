import { alias } from '@ember/object/computed';
import { A } from '@ember/array';
import { merge } from '@ember/polyfills';
import Component from '@ember/component';
import { getWithDefault, computed, set, get } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import moment from 'moment';

export default Component.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  request: service(),
  router: service(),
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
  isStatic: alias('model.isStatic'),
  hasGroup: notEmpty('selectedGroup'),

  init() {
    this._super(...arguments);
    let model, group;
    if (get(this, 'model')) {
      model = get(this, 'model');
      group = get(model, 'group');
      set(this, 'selectedGroup', group);
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
    try {
      let { data } = yield get(this, 'request').post(
        '/wrappers/filter_wrappers/',
        {
          data: {
            filters: filter,
            group: get(this, 'selectedGroup.id')
          }
        }
      );

      let store = get(this, 'store');
      let records = A();
      data.forEach(wrapper => {
        store.push(store.normalize('wrapper', wrapper));
        let peek = store.peekRecord('wrapper', wrapper.id);
        records.addObject(peek);
      });

      set(this, 'wrapperList', records);
    } catch (e) {
      console.log(e);
    }
  }),

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
      set(this, 'addFilterItem', false);
      get(this, 'getWrappers').perform();
    },
    deleteFilterItem(obj) {
      console.log(obj);
      let [key] = Object.keys(obj);
      let model = get(this, 'model');
      model.deleteFilter(key);
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
