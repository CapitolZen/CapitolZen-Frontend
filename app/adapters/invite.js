import ApplicationAdapter from './application';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default ApplicationAdapter.extend({
  session: service(),
  urlForFindRecord(id, modelName, snapshot) {
    if (get(this, 'session.isAuthenticated')) {
      return this._super(...arguments);
    } else {
      let baseUrl = this.buildURL();
      return `${baseUrl}invites/${id}/preview/`;
    }
  }
});
