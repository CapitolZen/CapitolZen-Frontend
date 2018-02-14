import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Component.extend({
  store: service(),
  currentUser: service(),
  pageSize: 10,
  didReceiveAttrs() {
    this._super(...arguments);
    get(this, 'loadRecords').perform();
  },
  params: {},
  defaultFilters: computed(function() {
    let created_after = moment.startOf('week').toISOString();
    return { created_after };
  }),
  loadRecords: task(function*() {
    let params = get(this, 'params');

    if (!params.page_size) {
      params.page_size = get(this, 'pageSize');
    }
    let records = yield get(this, 'store').query('action', params);
    console.log(records.get('meta'));
    set(this, 'meta', records.get('meta'));
    set(this, 'recordList', records);
  }),
  actions: {
    dismissAction(action) {
      action.updateState('dismissed');
      action.save().then(() => {
        get(this, 'currentUser').event('action:dismiss');
        get(this, 'recordList').removeObject(action);
      });
    }
  }
});
