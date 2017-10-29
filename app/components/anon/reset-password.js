import userResetPassword from '../../validators/user-reset-password';
import FormComponent from 'ui/components/form/base-model-form';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

export default FormComponent.extend({
  ajax: service(),
  flashMessages: service(),
  session: service(),
  router: service(),
  /**
   * Model setup
   */
  initModel() {
    let model = {
      password: '',
      confirmPassword: ''
    };

    this.set('model', model);

    let changeset = new Changeset(
      this.get('model'),
      lookupValidator(userResetPassword),
      userResetPassword
    );

    this.set('changeset', changeset);
  },

  /**
   * Success
   */
  onSubmitSuccess(data) {
    let authenticator = 'authenticator:jwt';
    let creds = {
      identification: data.data.email,
      password: this.get('model.password')
    };

    get(this, 'session')
      .authenticate(authenticator, creds)
      .then(() => {
        this.get('router').transitionToRoute('dashboard');
      });
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
    console.log(this.get('token'));
    this.set('model.token', this.get('token'));
    let payload = this.get('model');

    yield this.get('ajax')
      .post('users/reset_password/', { data: payload })
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
