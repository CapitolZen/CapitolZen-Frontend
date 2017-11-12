import Component from '@ember/component';
import TableCommon from '../../mixins/table-common';
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
        cellComponent: 'committees/-table/cmte-chamber',
        sortable: true
      },
      {
        label: 'Name',
        valuePath: 'computedName',
        sortable: true
      },
      {
        label: 'Actions',
        cellComponent: 'committees/-table/cmte-actions',
        sortable: false,
        align: 'right'
      }
    ];
  })
});
