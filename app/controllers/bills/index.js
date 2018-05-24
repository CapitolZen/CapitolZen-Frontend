import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['page', 'search', 'sponsor_party'],
  page: 1,
  search: '',
  sponsor_party: '',

  params: computed('page', 'search', 'sponsor_name', function() {
    return this.getProperties(['page', 'search', 'sponsor_party']);
  })
});
