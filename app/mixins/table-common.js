import Mixin from '@ember/object/mixin';
import { merge } from '@ember/polyfills';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';
import Table from 'ember-light-table';
import { task } from 'ember-concurrency';

export default Mixin.create({
  store: service(),
  page: 0,
  page_size: 50,
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

  /**
   *
   */
  init() {
    this._super(...arguments);

    let table = new Table(this.get('columns'), this.get('model'), {
      enableSync: this.get('enableSync')
    });
    let sortColumn = table
      .get('allColumns')
      .findBy('valuePath', this.get('sort'));

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

    query = merge(this.get('recordQuery'), query);
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
        this.set(
          'sort',
          (column.ascending ? '' : '-') + column.get('valuePath')
        );
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
  }
});
