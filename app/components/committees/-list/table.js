import Component from '@ember/component';

export default Component.extend({
  recordType: 'committee',
  dir: 'asc',
  sort: false,
  tableOptions: {
    height: '90vh'
  },
  columns: [
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
  ]
});
