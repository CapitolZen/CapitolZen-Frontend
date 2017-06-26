import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  // get current user data
  urlForQueryRecord(query) {
    if (query.currentUser) {
      delete query.currentUser;
      return `${this._super(...arguments)}/current`;
    }

    if (query.currentOrg) {
      delete query.currentOrg;
      return `${this._super(...arguments)}/current_org`;
    }

    return this._super(...arguments);
  }
});
