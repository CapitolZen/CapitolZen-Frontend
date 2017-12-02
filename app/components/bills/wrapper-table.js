import Component from '@ember/component';
import { get, computed } from '@ember/object';
import TableCommon from '../../mixins/table-common';
import { task } from 'ember-concurrency';

export default Component.extend(TableCommon, {
  model: 'wrapper',
  recordType: 'wrapper',
  tableHeight: '100vh',
  sort: 'stateId',
  pager: true,
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
        valuePath: 'sponsorDisplay',
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
        valuePath: 'position',
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
