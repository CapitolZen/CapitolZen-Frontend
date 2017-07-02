import Ember from 'ember';
import Table from 'ember-light-table';
import {task} from 'ember-concurrency';

const {
  inject: {
    service
  },
  isEmpty,
  computed
} = Ember;

export default Ember.Mixin.create({
  store: service(),
  page: 0,
  page_size: 100,
  sort: 'name',
  recordType: null,
  recordQuery: {},
  isLoading: computed.oneWay('fetchRecords.isRunning'),
  canLoadMore: true,
  enableSync: true,
  model: null,
  meta: null,
  columns: null,
  table: null,

  maxPagerCount: 18,
  currentPageRange: computed('meta.pagination.pages', 'page', function () {
    let totalPages = this.get('meta.pagination.pages');
    let currentPage = this.get('page');
    let maxDisplay = this.get('maxPagerCount');
    let half = Math.round(maxDisplay / 2);
    if (totalPages < maxDisplay) {
      return [false, false];
    }

    let min = currentPage - half;
    min = (min < 0) ? 0 : min;

    let max = currentPage + half;
    max = (max > totalPages) ? totalPages : max;

    return [min, max];
  }),
  currentPageMax: computed('currentPageRange', function () {
    return this.get('currentPageRange')[1];
  }),
  currentPageMin: computed('currentPageRange', 'page', function () {
    return this.get('currentPageRange')[0];
  }),



  /**
   *
   */
  init() {
    this._super(...arguments);

    let table = new Table(this.get('columns'), this.get('model'), {enableSync: this.get('enableSync')});
    let sortColumn = table.get('allColumns').findBy('valuePath', this.get('sort'));

    // Setup initial sort column
    if (sortColumn) {
      sortColumn.set('sorted', true);
    }

    this.set('table', table);
  },

  /**
   *
   */
  fetchRecords: task(function*() {
    let query = this.getProperties(['page', 'page_size', 'sort']);

    query = Ember.assign(query, this.get('recordQuery'));
    let records = yield this.get('store').query(this.get('recordType'), query);
    this.get('model').pushObjects(records.toArray());
    this.set('meta', records.get('meta'));
    this.set('canLoadMore', !isEmpty(records.get('meta').next));
  }).restartable(),

  /**
   *
   */
  resetTable() {
    this.setProperties({
      canLoadMore: true,
      page: 0
    });
    this.get('model').clear();
  },

  /**
   *
   */
  actions: {
    onScrolledToBottom() {
      if (this.get('canLoadMore')) {
        this.incrementProperty('page');
        this.get('fetchRecords').perform();
      }
    },

    onColumnClick(column) {
      if (column.sorted) {
        this.set('sort', (column.ascending ? '' : '-') + column.get('valuePath'));
        this.resetTable();
      }
    },
    setPage(page) {
      let totalPages = this.get('meta.pagination.pages');
      let currPage = this.get('page');

      if (page < 1 || page > totalPages || page === currPage) {
        return;
      }

      this.set('page', page);
      this.get('model').clear();
      this.get('fetchRecords').perform();
    }
  },
});