import { oneWay } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';
import { merge } from '@ember/polyfills';
import { inject as service } from '@ember/service';
import { underscore } from '@ember/string';
import { isEmpty, typeOf } from '@ember/utils';
import { computed, get, set } from '@ember/object';
import Table from 'ember-light-table';
import { task } from 'ember-concurrency';

export default Mixin.create({
  store: service(),
  page: 0,
  page_size: 50,
  sort: 'name',
  recordType: null,
  recordQuery: {},
  isLoading: oneWay('fetchRecords.isRunning'),
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

    query = merge(get(this, 'recordQuery'), query);
    let records = yield get(this, 'store').query(
      get(this, 'recordType'),
      query
    );
    get(this, 'model').pushObjects(records.toArray());
    set(this, 'meta', records.get('meta'));
    set(this, 'canLoadMore', !isEmpty(records.get('meta').next));
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
