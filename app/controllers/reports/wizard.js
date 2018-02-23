import Controller from '@ember/controller';
import { get, computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['step', 'group'],
  group: null,
  page: null,
  config: computed('group', function() {
    let config = {};

    if (get(this, 'group')) {
      config.group = get(this, 'group');
    }
    return config;
  })
});
