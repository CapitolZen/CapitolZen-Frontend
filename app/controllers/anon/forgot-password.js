import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

import userRequestPasswordReset from '../../validators/user-request-password-reset';
import SingleFormState from '../../mixins/single-form-state';

export default Controller.extend(SingleFormState, {
  ajax: service(),
  flashMessages: service(),
  init() {
    this._super(...arguments);
    this.model = {
      email: null
    };
    this.changeset = new Changeset(
      this.get('model'),
      lookupValidator(userRequestPasswordReset),
      userRequestPasswordReset
    );
  },
  userRequestPasswordReset,
  actions: {
    resetPassword(changeset) {
      if (!changeset.get('isDirty')) {
        return false;
      }
      this.setFormState('pending');
      changeset.execute();

      let payload = this.get('model');

      this.get('ajax')
        .post('users/reset_password_request/', { data: payload })
        .then(() => {
          get(this, 'flashMessages').success(
            'Password reset link sent. Please check your email inbox shortly.'
          );
        })
        .catch(data => {
          this.handleServerFormErrors(data);
          this.setFormState('default');
        });
    }
  }
});
