import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
  classNames: ['group-nav-wrapper'],
  target: computed('value', 'group', function() {
    if (get(this, 'value')) {
      return get(this, 'value');
    }

    if (get(this, 'group')) {
      return get(this, 'group.id');
    }

    if (get(this, 'row')) {
      return get(this, 'row.id');
    }
  })
});
