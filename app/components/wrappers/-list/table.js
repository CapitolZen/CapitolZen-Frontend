import Component from '@ember/component';
import moment from 'moment';
import { computed } from '@ember/object';

export default Component.extend({
  recordType: 'wrapper',
  sort: 'stateId',
  filtering: true,
  group: null,
  defaultRecordQuery: computed(function() {
    let query = {};

    if (this.get('filtering')) {
      query['date_filter_type'] = 'active';
      query['daterange'] = {
        startDate: moment()
          .startOf('day')
          .subtract(1, 'month'),
        endDate: moment()
          .endOf('day')
          .add(1, 'second') //makes the query include the current day
      };
    }

    if (this.get('group')) {
      query['group'] = this.get('group.id');
    }

    if (this.get('report')) {
      query['report'] = this.get('report.id');
    }

    return query;
  }),

  tableOptions: {
    height: '65vh',
    canSelect: true,
    responsive: true
  },

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
      width: '40px',
      sortable: false,
      cellComponent: 'table/row-toggle',
      breakpoints: ['mobile', 'tablet']
    },
    {
      label: 'Bill ID',
      valuePath: 'bill.stateId',
      sortable: true,
      cellComponent: 'wrappers/-list/cell/title'
    },
    {
      label: 'Position',
      cellComponent: 'wrappers/-list/cell/position'
    },
    {
      label: 'Summary',
      valuePath: 'bill.title',
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
      cellComponent: 'wrappers/-list/cell/actions',
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
    }
  }
});
