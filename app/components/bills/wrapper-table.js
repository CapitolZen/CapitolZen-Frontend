import Component from '@ember/component';
import { get, computed } from '@ember/object';
import TableCommon from '../../mixins/table-common';
import { task } from 'ember-concurrency';

export default Component.extend(TableCommon, {
  model: 'wrapper',
  recordType: 'wrapper',
  tableHeight: '100vh',
  pager: true,
  columns: computed(function() {
    return [
      {
        label: 'State ID',
        valuePath: 'bill.stateId',
        sortable: true
      },
      {
        label: 'Sponsor',
        valuePath: 'bill.sponsor.fullName',
        sortable: false,
        breakpoints: ['mobile', 'tablet', 'desktop']
      },
      {
        label: 'Party',
        valuePath: 'bill.sponsor.party',
        sortable: false,
        breakpoints: ['tablet', 'desktop']
      },
      {
        label: 'Last Action',
        valuePath: 'lastActionDate',
        cellComponent: 'bills/bill-table-status',
        sortable: false,
        breakpoints: ['mobile', 'tablet', 'desktop']
      },

      {
        label: 'Actions',
        cellComponent: 'wrappers/wrapper-table-actions',
        sortable: false
      }
    ];
  })
});
