import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { get, computed } from '@ember/object';

import userRequestPasswordReset from '../../validators/user-request-password-reset';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';

export default FormComponent.extend({
  ajax: service(),
  flashMessages: service(),

  validator: userRequestPasswordReset,
  model: computed(function() {
    return {
      email: null
    };
  }),

  /**
   * Success
   */
  onSubmitSuccess() {
    get(this, 'flashMessages').success(
      'Password reset link sent. Please check your email inbox shortly.'
    );
  },

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
