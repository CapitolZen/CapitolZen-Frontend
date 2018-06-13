import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  media: service(),
  sort: 'name',
  recordType: 'file',
  table: null,
  canSelect: false,
  tableOptions: computed(function() {
    let canSelect = get(this, 'canSelect');
    return {
      canSelect,
      height: '65vh',
      responsive: true
    };
  }),
  defaultRecordQuery: {},
  columns: [
    {
      label: 'Name',
      valuePath: 'name'
    },
    {
      label: 'Description',
      valuePath: 'description'
    },
    {
      label: 'View',
      cellComponent: 'files/-cell/file-actions',
      align: 'center'
    }
  ],
  actions: {
    postTableSetup(table) {
      this.set('table', table);
    }
  }
});
