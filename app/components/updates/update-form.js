import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import { A } from '@ember/array';
import { task, timeout } from 'ember-concurrency';
import { run } from '@ember/runloop';
import $ from 'jquery';

export default FormComponent.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  fileList: A(),
  model: computed('page', 'update', function() {
    if (get(this, 'update')) {
      return get(this, 'update');
    } else {
      return this.createNewModel();
    }
  }),
  _page: computed('update', 'page', function() {
    if (this.page) {
      return this.page;
    }
    return this.get('update.page');
  }),
  isNew: false,
  createNewModel() {
    return get(this, 'store').createRecord('update', {
      page: get(this, '_page'),
      group: get(this, 'page.group'),
      organization: get(this, 'page.group.organization'),
      user: get(this, 'currentUser.user'),
      document: false
    });
  },
  searchWrappers: task(function*(term) {
    yield timeout(400);
    return get(this, 'store').query('wrapper', {
      search: term,
      group: get(this, 'model.group.id')
    });
  }),
  callSuccess() {},
  onSubmitSuccess(model) {
    if (this.get('isNew')) {
      this.get('flashMessages').success('New Update Posted!');
      let newModel = this.createNewModel();
      this.set('model', newModel);
      this.initFormData();
      run(() => {
        $('.mobiledoc-editor__editor').empty();
      });
    } else {
      this.get('flashMessages').success('Update Saved!');
    }

    this.callSuccess(model);
  },
  actions: {
    selectFile(file) {
      get(this, 'changeset.files').unshiftObject(file);
    },
    removeFile(file) {
      get(this, 'changeset.files').removeObject(file);
      file.destroyRecord();
    }
  }
});
