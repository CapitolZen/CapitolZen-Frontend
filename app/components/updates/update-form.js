import { inject as service } from '@ember/service';
import { computed, set, get } from '@ember/object';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import UpdateEdit from '../../validators/update-edit';
import { alias } from '@ember/object/computed';
import { A } from '@ember/array';

export default FormComponent.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  fileList: A(),
  model: computed('page', 'update', function() {
    if (get(this, 'update')) {
      return get(this, 'update');
    } else {
      return get(this, 'store').createRecord('update', {
        page: get(this, 'page'),
        group: get(this, 'page.group'),
        organization: get(this, 'page.group.organization'),
        user: get(this, 'currentUser.user')
      });
    }
  }),
  callSuccess() {},
  onSubmitSuccess(model) {
    get(this, 'flashMessages').success('New Page Created!');
    get(this, 'callSuccess')(model);
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
