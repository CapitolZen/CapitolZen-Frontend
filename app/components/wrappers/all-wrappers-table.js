import Component from '@ember/component';
import TableCommon from '../../mixins/table-common';
import DateFilter from '../../mixins/date-filter';
import { computed, set, get } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { merge } from '@ember/polyfills';

export default Component.extend(TableCommon, DateFilter, {
  model: 'wrappers',
  recordType: 'wrapper',
  tableHeight: '100vh',
  page_size: 100,
  sort: 'state_id',
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
        breakpoints: ['tablet', 'desktop']
      },
      {
        label: 'Last Action',
        valuePath: 'bill.lastActionDate',
        cellComponent: 'bills/bill-table-status',
        sortable: false,
        breakpoints: ['mobile', 'tablet', 'desktop']
      },
      {
        label: 'Position',
        cellComponent: 'wrappers/wrapper-table-position'
      },
      {
        label: 'Actions',
        cellComponent: 'wrappers/wrapper-table-actions',
        sortable: false,
        align: 'right'
      }
    ];
  })
});
