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
  defaultRecordQuery: {
    date_filter_type: 'active',
    daterange: {
      startDate: moment()
        .startOf('day')
        .subtract(1, 'month'),
      endDate: moment()
        .endOf('day')
        .add(1, 'second') //makes the query include the current day
    }
  },

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

  dateFilterOptions: ['active', 'introduced'],
  dateFilterPresents: [
    {
      label: 'Today',
      start: moment().startOf('day'),
      end: moment().endOf('day')
    },
    {
      label: 'Last Week',
      start: moment()
        .subtract(1, 'week')
        .startOf('week'),
      end: moment()
        .subtract(1, 'week')
        .endOf('week')
    },
    {
      label: 'Last Month',
      start: moment()
        .subtract(1, 'month')
        .startOf('month'),
      end: moment()
        .subtract(1, 'month')
        .endOf('month')
    },
    {
      label: 'This Session',
      start: moment().startOf('year'),
      end: moment()
    }
  ],

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
      //
      // Parse daterange into api friendly format.
      if ('daterange' in query) {
        let { startDate, endDate } = query['daterange'];
        let range = `${startDate.toISOString()},${endDate.toISOString()}`;

        delete query['daterange'];
        delete query['active_range'];
        delete query['introduced_range'];

        query[query['date_filter_type'] + '_range'] = range;
      }

      // Get externally passed-in params
      let externalRQ = get(this, 'recordQuery');

      query = assign(query, externalRQ);
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
