import Ember from "ember";

const { assert, inject: { service } } = Ember;
export default Ember.Service.extend({
  request: service(),
  currentUser: service(),
  getLogoUploadUrl(orgId = false) {
    let id = orgId || this.get("currentUser.organization").get("id");
    return this.get("request").request(`organizations/${orgId}/logo_upload/`);
  },

  getAssetUploadUrl(group, name, acl) {
    assert(group, "group is required");
    let orgId = group.get("organization.id");
    assert(orgId, "valid org info is required");
    return this.get("request").post(`organizations/${orgId}/asset_upload/`, {
      data: {
        group_id: group.get("id"),
        file_name: name,
        acl: acl
      }
    });
  }
});
