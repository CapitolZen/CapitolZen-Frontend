import Component from '@ember/component';
import { computed, set, get } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import TableCommon from '../../mixins/table-common';
import DateFilter from '../../mixins/date-filter';

export default Component.extend(TableCommon, DateFilter, {
  model: 'bills',
  tableHeight: '100vh',
  pager: true,
  sort: 'state_id',
  columns: computed(function() {
    return [
      {
        label: 'State ID',
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
        label: 'Last Action',
        cellComponent: 'bills/bill-table-status',
        sortable: false,
        breakpoints: ['mobile', 'tablet', 'desktop']
      },
      {
        label: 'Actions',
        cellComponent: 'bills/bill-table-actions',
        sortable: false,
        align: 'right'
      }
    ];
  })
});
