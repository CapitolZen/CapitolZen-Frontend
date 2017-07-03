import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForQueryRecord(query) {
    if (query.logoUpload) {
      delete query.logoUpload;
      let id = query.orgId;
      delete query.orgId;
      return `${this._super(...arguments)}/${id}/logo_upload`;
    }

    if (query.groupUpload) {
      delete query.groupUpload;
      delete query.logoUpload;
      let id = query.orgId;
      delete query.orgId;
      let url = `${this._super(...arguments)}/${id}/logo_upload`;

      if (query.groupId) {
        url += `?group_id=${query.groupId}`;
        delete query.groupId;
      }
      return url;
    }

    return this._super(...arguments);
  }
});
