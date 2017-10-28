import { inject as service } from '@ember/service';
import EmberObject, { computed, get, set } from '@ember/object';
import Changeset from 'ember-changeset';
import UserRegistration from '../../validators/user-registration';
import lookupValidator from 'ember-changeset-validations';
import { task } from 'ember-concurrency';
import FormComponent from 'ui/components/form/base-model-form';

export default FormComponent.extend({
  ajax: service(),
  store: service(),
  session: service(),
  flashMessages: service(),

  /**
   * Model setup
   */
  initModel() {
    let model = {};

    this.set('model', model);

    let changeset = new Changeset(
      model,
      lookupValidator(UserRegistration),
      UserRegistration
    );

    this.set('changeset', changeset);
  },

  /**
   * Success
   */
  onSubmitSuccess() {
    this.get('session').authenticate('authenticator:jwt', {
      identification: this.get('model.username'),
      password: this.get('model.password')
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

    yield this.get('ajax')
      .post('users/register/', { data: this.get('model') })
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
