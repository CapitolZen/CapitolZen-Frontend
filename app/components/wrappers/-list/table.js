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
      return query;
    }
  }
});
