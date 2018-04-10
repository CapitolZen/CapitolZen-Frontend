import ApplicationAdapter from './application';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default ApplicationAdapter.extend({
  session: service(),
  headers: computed(function() {
    let page = this.get('session.data.currentPageId');
    return { 'X-Page': page };
  })
});
