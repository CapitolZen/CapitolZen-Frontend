import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import UserValidations from '../../../validators/user';
import SingleFormState from '../../../mixins/single-form-state';

export default Component.extend(SingleFormState, {
  tagName: '',
  flashMessages: service(),
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(
      get(this, 'user'),
      lookupValidator(UserValidations),
      UserValidations
    );
  },
  actions: {
    submit(changeset) {
      if (!changeset.get('isDirty')) {
        return false;
      }
      this.setFormState('pending');
      changeset
        .save()
        .then(() => {
          get(this, 'flashMessages').success('Account Updated');
        })
        .catch(() => {
          this.handleServerFormErrors(data);
          this.setFormState('default');
        });
    }
  }
});
