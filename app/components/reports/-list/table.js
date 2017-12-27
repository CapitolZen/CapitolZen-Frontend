import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  recordType: 'report',
  dir: 'asc',
  sort: false,

  defaultRecordQuery: computed(function() {
    let query = {};
    if (this.get('group')) {
      query['group'] = this.get('group.id');
    }

    return query;
  }),

  tableOptions: {
    height: '65vh',
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
      label: 'Title',
      valuePath: 'title'
    },
    {
      label: 'Client',
      cellComponent: 'reports/-list/cell/client'
    },
    {
      label: 'Author',
      valuePath: 'user.name',
      breakpoints: ['tablet', 'desktop']
    },
    {
      label: 'Created Date',
      valuePath: 'created',
      cellComponent: 'tools/tables/date-cell',
      breakpoints: ['tablet', 'desktop']
    },
    {
      label: 'Actions',
      cellComponent: 'reports/-list/cell/actions',
      align: 'right'
    }
  ]
});
