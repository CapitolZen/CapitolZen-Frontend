import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import ChangePassword from '../../../validators/user-change-password';
import SingleFormState from '../../../mixins/single-form-state';

export default Component.extend(SingleFormState, {
  tagName: '',
  flashMessages: service(),
  init() {
    this._super(...arguments);
    let model = {
      current_password: '',
      password: '',
      confirm_password: ''
    };

    this.set('model', model);
    this.changeset = new Changeset(
      model,
      lookupValidator(ChangePassword),
      ChangePassword
    );
  },
  actions: {
    submit(changeset) {
      if (!changeset.get('isDirty')) {
        return false;
      }
      this.setFormState('pending');
      changeset.execute();

      let payload = {
        data: {
          type: 'users',
          attributes: this.get('model')
        }
      };

      this.get('user')
        .change_password(payload)
        .then(() => {
          get(this, 'flashMessages').success('Password Updated');
        })
        .catch(data => {
          this.handleServerFormErrors(data);
          this.setFormState('default');
        });
    }
  }
});
