import userLogin from '../../validators/user-login';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import { task } from 'ember-concurrency';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';

export default FormComponent.extend({
  session: service(),
  flashMessages: service(),

  validator: userLogin,
  model: computed(function() {
    return {
      identification: null,
      password: null
    };
  }),

  /**
   * Replace the submit handler since we're not just running changeset.save
   */
  submit: task(function*(changeset) {
    const authenticator = 'authenticator:jwt';

    changeset.execute();
    let model = this.get('model');

    yield this.get('session')
      .authenticate(authenticator, model)
      .catch(data => {
        this.handleServerFormErrors(data);
        this.setFormState('default');
        this.onServerError(data);
        throw data;
      });
  }).drop()
});
