import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { A } from '@ember/array';

export default Component.extend({
  store: service(),
  windoc: service(),
  currentUser: service(),
  classNames: ['h100'],
  currentPage: 0,
  totalPages: 1,
  model: A(),
  actionList: filterBy('model', 'state', 'active'),
  init() {
    this._super(...arguments);
    get(this, 'fetchRecords').perform();
  },
  fetchRecords: task(function*() {
    let params = { state: 'active', pageSize: 12 };
    let currentPage = get(this, 'currentPage');

    if (currentPage) {
      params['page'] = currentPage;
    }
    try {
      let records = yield get(this, 'store').query('action', params);
      get(this, 'model').addObjects(records);
      let meta = records.get('meta');
      let { pages, page, count } = meta.pagination;
      page++;
      set(this, 'totalPages', pages);
      set(this, 'currentPage', page);
      set(this, 'totalRecordCount', count);
    } catch (e) {
      console.log(e); // eslint-ignore-line
    }
  }).drop(),
  recordsComplete: computed(
    'windoc.{scrollTop,scrollHeight}',
    'totalRecordCount',
    'model.[]',
    'actionList',
    function() {
      let top = get(this, 'windoc.scrollTop'),
        total = get(this, 'windoc.scrollHeight'),
        modelLength = get(this, 'model.length'),
        totalServerCount = get(this, 'totalRecordCount');

      if (top / total > 0.55 && modelLength < totalServerCount) {
        get(this, 'fetchRecords').perform();
      }
      return modelLength <= totalServerCount;
    }
  )
});
