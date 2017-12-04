import { computed, get, set } from '@ember/object';
import Component from '@ember/component';
import TableCommon from '../../mixins/table-common';

export default Component.extend(TableCommon, {
  recordType: 'report',
  tableHeight: '100vh',
  pager: true,
  init() {
    this._super(...arguments);
    if (get(this, 'group')) {
      set(this, 'recordQuery', { group: get(this, 'group.id') });
    }
  },
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
