import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  name: 'fileUpload',
  ajax: service(),
  store: service(),
  currentUser: service(),
  group: false,
  upload: task(function*(file) {
    let type = get(file, 'type');
    let upload_params = yield get(this, 'ajax')
      .request('/file_manager/', { data: { type: type } })
      .then(response => {
        return response.data;
      });

    if (!upload_params) {
      return false;
    }

    let upload_response = yield file.upload({
      url: upload_params.url,
      contentType: type,
      data: upload_params.fields
    });

    if (!upload_response) {
      return false;
    }

    let model = get(this, 'store').createRecord('file', {
      organization: get(this, 'currentUser.organization'),
      user: get(this, 'currentUser.user'),
      name: file.get('name'),
      file: upload_response.headers.location
    });

    if (get(this, 'group')) {
      model.set('group', get(this, 'group'));
    }

    let created = yield model.save();
    get(this, 'didCreateFile')(created);
  }).enqueue(),
  /**
   * No-op
   * for curried action to outside compoennts.
   */
  didCreateFile() {},
  actions: {
    fileUpload(file) {
      get(this, 'upload').perform(file);
    }
  }
});
