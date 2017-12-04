import { inject as service } from '@ember/service';
import { computed, get, set } from '@ember/object';
import UserRegistration from '../../validators/user-registration';
import { task, timeout } from 'ember-concurrency';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';

export default FormComponent.extend({
  ajax: service(),
  store: service(),
  session: service(),
  flashMessages: service(),

  validator: UserRegistration,
  model: computed(function() {
    return {};
  }),

  /**
   * Success
   */
  onSubmitSuccess() {
    this.get('session').authenticate('authenticator:jwt', {
      identification: this.get('model.username'),
      password: this.get('model.password')
    });
  },
  setupStep: null,
  generateFakeSteps: task(function*() {
    set(this, 'setupStep', 'Creating Account');
    yield timeout(1500);
    set(this, 'setupStep', 'Creating Organization');
    yield timeout(1500);
    set(this, 'setupStep', 'Finding Committee Meetings');
    yield timeout(1500);
    set(this, 'setupStep', 'Gathering Bills');
    yield timeout(1500);
    set(this, 'setupStep', 'Loading Application');
    yield timeout(1500);
    set(this, 'setupStep', 'Reticulating Splines');
  }),

  /**
   * Replace the submit handler since we're not just running changeset.save
   */
  submit: task(function*(changeset) {
    changeset.execute();
    get(this, 'generateFakeSteps').perform();
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
