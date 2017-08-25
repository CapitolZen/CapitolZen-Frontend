import Ember from 'ember';
import TableCommon from '../../mixins/table-common';

const { computed, Component } = Ember;
export default Component.extend(TableCommon, {
  model: 'report',
  tableHeight: '100vh',
  pager: true,
  columns: computed(function() {
    return [
      {
        label: 'Title',
        valuePath: 'title'
      },
      {
        label: 'Client',
        valuePath: 'group.title'
      },
      {
        label: 'Author',
        valuePath: 'user.name'
      },
      {
        label: 'Created Date',
        valuePath: 'created'
      },
      {
        label: 'Actions',
        cellComponent: 'reports/report-table-actions'
      }
    ];
  })
});
