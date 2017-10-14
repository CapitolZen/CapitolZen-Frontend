import { get } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

import userResetPassword from '../../validators/user-reset-password';
import SingleFormState from '../../mixins/single-form-state';

export default Controller.extend(SingleFormState, {
  ajax: service(),
  flashMessages: service(),
  session: service(),
  init() {
    this._super(...arguments);
    this.model = {
      password: '',
      confirmPassword: ''
    };
    this.changeset = new Changeset(
      this.get('model'),
      lookupValidator(userResetPassword),
      userResetPassword
    );
  },
  userResetPassword,
  actions: {
    resetPassword(changeset) {
      let token = get(this, 'token');
      if (!changeset.get('isDirty')) {
        return false;
      }
      this.setFormState('pending');
      changeset.execute();
      this.set('model.token', token);
      let payload = this.get('model');

      this.get('ajax')
        .post('users/reset_password/', { data: payload })
        .then(data => {
          console.log(data);
          let authenticator = 'authenticator:jwt';
          let creds = {
            identification: data.data.email,
            password: this.get('model.password')
          };

          get(this, 'session')
            .authenticate(authenticator, creds)
            .then(() => {
              this.transitionToRoute('dashboard');
            });
        })
        .catch(data => {
          this.handleServerFormErrors(data);
          this.setFormState('default');
        });
    }
  }
});
