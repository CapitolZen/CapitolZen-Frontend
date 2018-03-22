import Component from '@ember/component';
import { get, set, computed } from '@ember/object';

export default Component.extend({
  columns: computed(function() {
    return [
      {
        label: 'Title',
        valuePath: 'title',
        sortable: true
      },
      {
        label: 'Visibility',
        valuePath: 'visibility',
        sortable: true
      },
      {
        label: 'Actions',
        cellComponent: 'pages/-list/cell/actions'
      }
    ];
  })
});
