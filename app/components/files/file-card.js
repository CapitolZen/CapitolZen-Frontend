import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { set, get } from '@ember/object';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';

const FileCard = FormComponent.extend({
  flashMessages: service(),
  router: service(),
  file: null,
  isEditing: false,
  previewSrc: alias('file.previewSrc'),
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
      get(this, 'model')
        .destroyRecord()
        .then(() => {
          this.get('flashMessages').success('File Deleted');
          this.get('router').transitionTo('files');
        });
    }
  }
});

FileCard.reopenClass({
  positionalParams: ['file']
});

export default FileCard;
