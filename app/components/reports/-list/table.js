import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  recordType: 'report',
  dir: 'asc',
  sort: false,

  columns: [
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
