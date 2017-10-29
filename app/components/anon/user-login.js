import userLogin from '../../validators/user-login';
import { inject as service } from '@ember/service';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';
import FormComponent from 'ui/components/form/base-model-form';

export default FormComponent.extend({
  session: service(),
  flashMessages: service(),

  /**
   * Model setup
   */
  initModel() {
    let model = {
      identification: null,
      password: null
    };

    this.set('model', model);

    let changeset = new Changeset(model, lookupValidator(userLogin), userLogin);

    this.set('changeset', changeset);
  },

  /**
   * Success
   */
  onSubmitSuccess() {},

  /**
   * Failure
   */
  onServerError() {},

  /**
   * Replace the submit handler since we're not just running changeset.save
   */
  submit: task(function*(changeset) {
    changeset.execute();
    const authenticator = 'authenticator:jwt';
    let model = this.get('model');
    console.log('=(e');
    yield this.get('session')
      .authenticate(authenticator, model)
      .catch(data => {
        this.handleServerFormErrors(data);
        this.setFormState('default');
        this.onServerError(data);
      });
  }).drop()
});
