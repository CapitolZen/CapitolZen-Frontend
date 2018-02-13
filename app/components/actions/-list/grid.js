import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Component.extend({
  store: service(),
  pageSize: 10,
  didReceiveAttrs() {
    this._super(...arguments);
    get(this, 'loadRecords').perform();
  },
  filterParams: computed(function() {
    return {};
  }),
  billList: A(),
  defaultFilters: computed(function() {
    let created_after = moment.startOf('week').toISOString();
    return { created_after };
  }),
  loadRecords: task(function*() {
    let params = get(this, 'filterParams');

    if (!params.page_size) {
      params.page_size = get(this, 'pageSize');
    }
    let records = yield get(this, 'store').query('action', params);
    console.log(records.get('meta'));
    set(this, 'meta', records.get('meta'));
    set(this, 'recordList', records);
  })
});
