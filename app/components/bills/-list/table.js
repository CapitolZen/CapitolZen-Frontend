import Component from '@ember/component';
import { computed, set, get } from '@ember/object';
import { notEmpty } from '@ember/object/computed';

export default Component.extend({
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

  tableOptions: {
    height: '90vh',
    canSelect: true
  },

  hasSelection: notEmpty('table.selectedRows'),
  selectedRows: computed('table.selectedRows.[]', function() {
    return get(this, 'table.selectedRows').map(row => {
      return get(row, 'content');
    });
  }),

  dateFilterOptions: ['introduced', 'active'],
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
      label: 'Bill ID',
      valuePath: 'stateId',
      sortable: true,
      width: '100px'
    },
    {
      label: 'Sponsor',
      valuePath: 'sponsor.fullName',
      sortable: false,
      breakpoints: ['mobile', 'tablet', 'desktop']
    },
    {
      label: 'Party',
      valuePath: 'sponsor.party',
      sortable: false,
      breakpoints: ['tablet', 'desktop']
    },
    {
      label: 'Recent Activity',
      cellComponent: 'bills/-list/cell/status',
      sortable: false,
      breakpoints: ['mobile', 'tablet', 'desktop']
    },
    {
      label: 'Actions',
      cellComponent: 'bills/-list/cell/actions',
      sortable: false,
      align: 'right'
    }
  ],

  actions: {
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
