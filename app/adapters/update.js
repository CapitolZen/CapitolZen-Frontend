import ApplicationAdapter from './application';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default ApplicationAdapter.extend({
  session: service(),
  headers: computed('session', function() {
    if (!this.get('session.isAuthenticated')) {
      let page = this.get('session.data.currentPageId');
      return { 'X-Page': page };
    }
    return {};
  })
});
