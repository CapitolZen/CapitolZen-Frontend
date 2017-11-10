import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import ChangePassword from '../../../validators/user-change-password';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import { task } from 'ember-concurrency';

export default FormComponent.extend({
  tagName: '',
  flashMessages: service(),

  /**
   * Model setup
   */
  initModel() {
    let model = {
      current_password: '',
      password: '',
      confirm_password: ''
    };

    this.set('model', model);

    let changeset = new Changeset(
      model,
      lookupValidator(ChangePassword),
      ChangePassword
    );

    this.set('changeset', changeset);
  },

  /**
   * Success
   */
  onSubmitSuccess() {
    get(this, 'flashMessages').success('Password Updated');
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
