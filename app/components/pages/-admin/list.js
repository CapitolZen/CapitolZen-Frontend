import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { A } from '@ember/array';

const defaultFilters = {
  search: null,
  group: null,
  published: null,
  visibility: null
};

export default Component.extend({
  store: service(),
  router: service(),
  recordType: 'page',
  params: null,
  maxPage: null,
  page: null,
  results: null,
  init() {
    this._super(...arguments);
    if (!this.params) {
      this.set('params', defaultFilters);
    }
    this.get('queryRecords').perform();
  },
  _queryCache: false,
  query() {
    let currentPage = this.page,
      params = this.params;

    let queryJSON = JSON.stringify(this.params);

    if (queryJSON === this._queryCache) {
      if (currentPage === this.maxPage) {
        return;
      }
      params.page = ++currentPage;
    }

    this.set('_queryCache', queryJSON);
    this.get('router').transitionTo({ queryParams: params });
    this.get('queryRecords').perform(params);
  },

  queryRecords: task(function*(query) {
    if (!query) {
      query = this.params;
    }
    let results = yield this.get('store').query(this.recordType, query);
    let {
      pagination: { pages, page }
    } = results.get('meta');
    this.set('maxPage', pages);
    this.set('page', page);
    this.set('results', results);
  }).drop(),
  actions: {
    scrolledBottom() {
      this.query();
    },
    filter(model) {
      console.log(model);
      this.query();
    },
    clearFilters() {
      this.set('params', defaultFilters);
      this.query();
    }
  }
});
