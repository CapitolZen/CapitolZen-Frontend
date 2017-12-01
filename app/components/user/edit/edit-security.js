import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import ChangePassword from '../../../validators/user-change-password';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import { task } from 'ember-concurrency';

export default FormComponent.extend({
  tagName: '',
  flashMessages: service(),

  validator: ChangePassword,
  model: computed(function() {
    return {
      current_password: '',
      password: '',
      confirm_password: ''
    };
  }),

  /**
   * Success
   */
  onSubmitSuccess() {
    get(this, 'flashMessages').success('Password Updated');
  },

  /**
   * Replace the submit handler since we're not just running changeset.save
   */
  submit: task(function*(changeset) {
    changeset.execute();

    let payload = {
      data: {
        type: 'users',
        attributes: this.get('model')
      }
    };

    yield this.get('user')
      .change_password(payload)
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
