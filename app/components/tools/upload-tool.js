import Ember from "ember";
import { task } from "ember-concurrency";

const { inject: { service }, Component, get } = Ember;

export default Component.extend({
  flashMessages: service(),
  store: service(),
  fetch: service(),
  currentUser: service(),
  group: null,
  multiple: true,
  name: "fileUpload",
  accept: "*/*",
  acl: "public-read",
  upload: task(function*(file) {
    let { data: { params: { url, fields } } } = yield get(
      this,
      "fetch"
    ).getAssetUploadUrl(
      get(this, "group"),
      get(file, "name"),
      get(this, "acl")
    );
    fields["acl"] = get(this, "acl");
    fields["success_action_status"] = "201";
    let response = yield file.upload({
      url: url,
      contentType: false,
      data: fields
    });
    get(this, "resultAction")(response);
  }).enqueue(),
  actions: {
    fileUpload(file) {
      get(this, "upload").perform(file);
    }
  }
});
