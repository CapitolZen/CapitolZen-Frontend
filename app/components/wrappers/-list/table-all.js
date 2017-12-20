import Component from '@ember/component';
import TableCommon from '../../../mixins/table-common';
import DateFilter from '../../../mixins/date-filter';
import { computed, set, get } from '@ember/object';
import { merge } from '@ember/polyfills';

export default Component.extend(TableCommon, DateFilter, {
  model: 'wrappers',
  recordType: 'wrapper',
  tableHeight: '100vh',
  page_size: 100,
  sort: 'stateId',
  columns: computed(function() {
    return [
      {
        label: 'ID',
        valuePath: 'bill.stateId',
        sortable: true,
        cellComponent: 'wrappers/-list/cell/title'
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
        cellComponent: 'bills/-list/cell/status',
        sortable: true,
        breakpoints: ['mobile', 'tablet', 'desktop']
      },
      {
        label: 'Position',
        cellComponent: 'wrappers/-list/cell/position'
      },
      {
        label: 'Actions',
        cellComponent: 'wrappers/-list/cell/actions',
        sortable: false,
        align: 'right'
      }
    ];
  })
});
