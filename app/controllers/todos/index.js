import Controller from '@ember/controller';
import { computed, get } from '@ember/object';

export default Controller.extend({
  queryParams: ['group', 'type'],
  group: null,
  type: null,
  pageTitle: computed('group', 'type', function() {
    if (get(this, 'type') === 'wrapper:updated' || get(this, 'group')) {
      return 'Saved Bill';
    }

    if (get(this, 'type') === 'bill:introduced') {
      return 'Introduced Bill';
    }

    return '';
  })
});
