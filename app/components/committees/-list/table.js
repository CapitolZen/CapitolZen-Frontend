import Component from '@ember/component';
import TableCommon from '../../../mixins/table-common';
import { get, set, computed } from '@ember/object';

export default Component.extend(TableCommon, {
  recordType: 'committee',
  tableHeight: '100vh',
  pager: true,
  columns: computed(function() {
    return [
      {
        label: 'Chamber',
        valuePath: 'chamber',
        cellComponent: 'committees/-list/cell/chamber',
        sortable: true
      },
      {
        label: 'Name',
        valuePath: 'displayName',
        sortable: true
      },
      {
        label: 'Actions',
        cellComponent: 'committees/-list/cell/actions',
        sortable: false,
        align: 'right'
      }
    ];
  })
});
