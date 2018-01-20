import Component from '@ember/component';
import { computed, set, get } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';

export default Component.extend({
  media: service(),
  sort: 'state_id',
  recordType: 'bill',
  table: null,
  searchParams: false,
  facetsToggled: false,
  facetsCollapsed: computed('facetsToggled', function() {
    return this.get('media').get('isMobile') && !this.get('facetsToggled');
  }),

  tableOptions: {
    height: '65vh',
    canSelect: true,
    responsive: true
  },

  hasSelection: notEmpty('table.selectedRows'),
  selectedRows: computed('table.selectedRows.[]', function() {
    return get(this, 'table.selectedRows').map(row => {
      return get(row, 'content');
    });
  }),

  columns: [
    {
      width: '40px',
      sortable: false,
      cellComponent: 'table/row-toggle',
      breakpoints: ['mobile', 'tablet']
    },
    {
      label: 'Bill ID',
      valuePath: 'stateId',
      sortable: true,
      width: '100px'
    },
    {
      label: 'Summary',
      valuePath: 'title',
      breakpoints: ['desktop'],
      cellClassNames: ['smaller-text']
    },
    {
      label: 'Sponsor',
      cellComponent: 'bills/-list/cell/sponsor',
      sortable: false,
      breakpoints: ['mobile', 'tablet', 'desktop']
    },
    {
      label: 'Recent Activity',
      cellComponent: 'bills/-list/cell/status',
      sortable: false,
      breakpoints: ['tablet', 'desktop']
    },
    {
      label: 'Actions',
      cellComponent: 'bills/-list/cell/actions',
      sortable: false,
      align: 'right'
    }
  ],

  actions: {
    toggleMobileFacets() {
      this.toggleProperty('facetsToggled');
    },

    /**
     * Post Table Setup Hook
     */
    postTableSetup(table) {
      this.set('table', table);
    },

    /**
     * Alter pojo represents query filtering before sending it over.
     * @param query
     * @returns {*}
     */
    preFilterAlter(query) {
      if (query.hasOwnProperty('search')) {
        if (get(this, 'searchParams') !== query.search) {
          delete query.page;
          set(this, 'searchParams', query.search);
        }
        query.search = query.search.toLowerCase();
      }
      return query;
    },

    /**
     * Select All Rows
     */
    selectAll() {
      get(this, 'table.rows').setEach('selected', true);
    },

    /**
     * Deselect All Rows
     */
    deselectAll() {
      get(this, 'table.selectedRows').setEach('selected', false);
    }
  }
});
