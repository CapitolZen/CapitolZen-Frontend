import Component from '@ember/component';
import { computed, set, get } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import TableCommon from '../../../mixins/table-common';
import DateFilter from '../../../mixins/date-filter';

export default Component.extend(TableCommon, DateFilter, {
  recordType: 'bill',
  tableHeight: '100vh',
  pager: true,
  sort: 'state_id',
  hasSelection: notEmpty('table.selectedRows'),
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
        cellComponent: 'bills/-list/cell/status',
        sortable: false,
        breakpoints: ['mobile', 'tablet', 'desktop']
      },
      {
        label: 'Actions',
        cellComponent: 'bills/-list/cell/actions',
        sortable: false,
        align: 'right'
      }
    ];
  }),
  actions: {
    selectAll() {
      get(this, 'table.rows').setEach('selected', true);
    },
    deselectAll() {
      get(this, 'table.selectedRows').setEach('selected', false);
    },
    addBulkToGroup() {
      set(this, 'showModal', true);
    }
  }
});
