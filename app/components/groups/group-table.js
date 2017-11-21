import Component from '@ember/component';
import { computed, set } from '@ember/object';

export default Component.extend({
  recordQuery: {},
  columns: computed(function() {
    return [
      {
        label: 'Logo',
        valuePath: 'avatar',
        cellComponent: 'groups/group-avatar',
        sortable: false
      },
      {
        label: 'Name',
        valuePath: 'title'
      },
      {
        label: 'Saved By',
        cellComponent: 'groups/table-favorites'
      },
      {
        label: 'Actions',
        cellComponent: 'groups/group-nav'
      }
    ];
  })
});
