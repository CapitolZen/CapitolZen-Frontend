import { computed } from '@ember/object';
import Component from '@ember/component';
import TableCommon from '../../mixins/table-common';

export default Component.extend(TableCommon, {
  model: 'report',
  tableHeight: '100vh',
  pager: true,
  columns: computed(function() {
    return [
      {
        label: 'Title',
        valuePath: 'title'
      },
      {
        label: 'Client',
        cellComponent: 'reports/report-table-link'
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
        cellComponent: 'reports/report-table-actions',
        align: 'right'
      }
    ];
  })
});
