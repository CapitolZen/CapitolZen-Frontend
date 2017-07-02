import Ember from 'ember';
import TableCommon from '../../mixins/table-common';

const { computed } = Ember;
export default Ember.Component.extend(TableCommon, {
  model: 'bills',
  tableHeight: '100vh',
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
  currentPageMax: computed('currentPageRange', function() {
    return this.get('currentPageRange')[1];
  }),
  currentPageMin: computed('currentPageRange', 'page', function () {
    return this.get('currentPageRange')[0];
  }),
  init() {
    this._super(...arguments);
    this.send('setPage', 1);
  },
  columns: computed(function() {
    return [
      {
        label: 'State ID',
        valuePath: 'stateId',
        width: '100px',
        sortable: true
      },
      {
        label: 'State',
        valuePath: 'state',
        sortable: true,
        breakpoints: ['desktop', 'jumbo']
      },
      {
        label: 'Sponsor',
        valuePath: 'sponsor',
        sortable: true,
        breakpoints: ['desktop', 'jumbo']
      },
      {
        label: 'Status',
        valuePath: 'status',
        sortable: true,
        breakpoints: ['desktop', 'jumbo']
      }
    ]
  }),

  actions: {
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
