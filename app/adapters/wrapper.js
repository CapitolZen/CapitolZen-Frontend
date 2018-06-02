import ApplicationAdapter from './application';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default ApplicationAdapter.extend({
  session: service(),
  headers: computed('session', 'session.data.currentPageId', function() {
    if (!this.get('session.isAuthenticated')) {
      let page = this.get('session.data.currentPageId');
      return { 'X-Page': page };
    }
    return {};
  })
});
