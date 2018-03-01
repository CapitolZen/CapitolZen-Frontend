import Controller from '@ember/controller';
import { get, computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['step', 'group', 'reportType'],
  group: null,
  page: null,
  reportType: null,
  config: computed('group', function() {
    let config = {};

    if (get(this, 'group')) {
      config.groupId = get(this, 'group');
    }
    if (get(this, 'reportType')) {
      config.reportType = get(this, 'reportType');
    }
    return config;
  })
});
