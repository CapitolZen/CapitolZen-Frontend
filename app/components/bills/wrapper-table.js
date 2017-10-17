import Component from '@ember/component';
import { get, computed } from '@ember/object';
import TableCommon from '../../mixins/table-common';
import { task } from 'ember-concurrency';

export default Component.extend(TableCommon, {
  model: 'bills',
  recordType: 'bill',
  tableHeight: '100vh',
  recordQuery: { listSaved: true },
  pager: true,
  columns: computed(function() {
    return [
      {
        label: 'State ID',
        valuePath: 'stateId',
        sortable: true
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
        valuePath: 'lastActionDate',
        cellComponent: 'bills/bill-table-date',
        sortable: false,
        breakpoints: ['mobile', 'tablet', 'desktop']
      },
      // {
      //   label: "Status",
      //   valuePath: "status",
      //   cellComponent: "bills/bill-table-status",
      //   sortable: true,
      //   breakpoints: ["mobile", "tablet", "desktop"]
      // },
      {
        label: 'Actions',
        cellComponent: 'bills/bill-table-actions',
        sortable: false
      }
    ];
  })
});
