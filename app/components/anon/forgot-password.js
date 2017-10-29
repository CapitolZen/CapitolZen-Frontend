import userRequestPasswordReset from '../../validators/user-request-password-reset';
import { inject as service } from '@ember/service';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { task } from 'ember-concurrency';
import { get } from '@ember/object';

import FormComponent from 'ui/components/form/base-model-form';

export default FormComponent.extend({
  ajax: service(),
  flashMessages: service(),

  /**
   * Model setup
   */
  initModel() {
    let model = {
      email: null
    };
    this.set('model', model);

    let changeset = new Changeset(
      this.get('model'),
      lookupValidator(userRequestPasswordReset),
      userRequestPasswordReset
    );
    this.set('changeset', changeset);
  },

  /**
   * Success
   */
  onSubmitSuccess() {
    get(this, 'flashMessages').success(
      'Password reset link sent. Please check your email inbox shortly.'
    );
  },

  /**
   * Failure
   */
  onServerError() {},

  /**
   * Replace the submit handler since we're not just running changeset.save
   */
  submit: task(function*(changeset) {
    changeset.execute();
    let payload = this.get('model');

    yield this.get('ajax')
      .post('users/reset_password_request/', { data: payload })
      .then(data => {
        this.onSubmitSuccess(data);
      })
      .catch(data => {
        this.handleServerFormErrors(data);
        this.setFormState('default');
        this.onServerError(data);
      });
  }).drop()
});
