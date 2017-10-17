import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForQueryRecord(query) {
    if (query === 'listSaved') {
      return `${this._super(...arguments)}/listSaved`;
    }
    return this._super(...arguments);
  }
});
