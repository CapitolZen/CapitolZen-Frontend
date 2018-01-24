import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { set, get } from '@ember/object';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import FileValidations from '../../validators/file';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';

const FileCard = FormComponent.extend({
  flashMessages: service(),
  file: null,
  isEditing: false,
  previewUrl: alias('file.previewUrl'),
  name: alias('file.name'),
  url: alias('file.url'),
  created: alias('file.created'),
  modified: alias('file.modified'),
  description: alias('file.description'),
  didReceiveAttrs() {
    this._super(...arguments);
    set(this, 'isEditing', false);
  },
  model: alias('file'),
  onSubmitSuccess() {
    set(this, 'isEditing', false);
    get(this, 'flashMessages').success('File Updated');
  },
  onServerError() {
    get(this, 'flashMessages').danger(
      "We're sorry, an error has occurred, and our team has been notified!"
    );
  },
  actions: {
    toggleEditing() {
      this.toggleProperty('isEditing');
    },
    deleteFile() {
      get(this, 'model').destroyRecord();
    }
  }
});

FileCard.reopenClass({
  positionalParams: ['file']
});

export default FileCard;
