import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { set, get } from '@ember/object';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import FileValidations from '../../validators/file';
import FormComponent from 'ui/components/form/base-model-form';

const FileCard = FormComponent.extend({
  flashMessages: service(),
  classNames: ['card'],
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
  initModel() {
    let file = get(this, 'file');
    let changeset = new Changeset(
      file,
      lookupValidator(FileValidations),
      FileValidations
    );
    set(this, 'changeset', changeset);
    set(this, 'model', file);
  },
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
    }
  }
});

FileCard.reopenClass({
  positionalParams: ['file']
});

export default FileCard;
