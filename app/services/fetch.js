import Service, { inject as service } from '@ember/service';
export default Service.extend({
  request: service(),
  currentUser: service(),
  getLogoUploadUrl(orgId = false) {
    let id = orgId || this.get('currentUser.organization').get('id');
    return this.get('request').request(`organizations/${orgId}/logo_upload/`);
  },

  getAssetUploadUrl({ organization, group, name, acl }) {
    let orgId = organization.get('id');

    let data = {
      file_name: name,
      acl: acl
    };
    if (group) {
      data.group_id = group.get('id');
    }

    return this.get('request').post(`organizations/${orgId}/asset_upload/`, {
      data
    });
  }
});
