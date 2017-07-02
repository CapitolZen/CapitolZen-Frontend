import Ember from 'ember';
import TableCommon from '../../mixins/table-common';

const { computed } = Ember;
export default Ember.Component.extend(TableCommon, {
  model: 'bills',
  tableHeight: '100vh',
  pager: true,
  init() {
    this._super(...arguments);
    this.send('setPage', 1);
  },
  columns: computed(function() {
    return [
      {
        label: 'State ID',
        valuePath: 'stateId',
        width: '100px',
        sortable: true
      },
      {
        label: 'State',
        valuePath: 'state',
        sortable: true,
        breakpoints: ['desktop', 'jumbo']
      },
      {
        label: 'Sponsor',
        valuePath: 'sponsor',
        sortable: true,
        breakpoints: ['desktop', 'jumbo']
      },
      {
        label: 'Status',
        valuePath: 'status',
        sortable: true,
        breakpoints: ['desktop', 'jumbo']
      }
    ]
  })
});