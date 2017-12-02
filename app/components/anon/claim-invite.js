import EmberObject, { set, get, computed } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

import userAcceptInvite from '../../validators/user-accept-invite';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';

export default FormComponent.extend({
  flashMessages: service(),
  ajax: service(),
  store: service(),
  session: service(),

  validator: userAcceptInvite,
  model: computed(function() {
    return {
      email: get(this, 'invite.email')
    };
  }),

  /**
   * Replace the submit handler since we're not just running changeset.save
   */
  submit: task(function*(changeset) {
    changeset.execute();
    let payload = this.get('model');
    let inviteId = get(this, 'invite.id');

    yield this.get('ajax')
      .post(`invites/${inviteId}/claim/`, { data: payload })
      .then(data => {
        this.onSubmitSuccess(data);
      })
      .catch(data => {
        this.handleServerFormErrors(data);
        this.setFormState('default');
        this.onServerError(data);
      });
  }).drop(),

  /**
   * Success
   */
  onSubmitSuccess() {
    get(this, 'flashMessages').success(`Welcome to Capitol Zen!`);

    let email = this.get('model.email');
    let password = this.get('model.password');

    return get(this, 'session').authenticate('authenticator:jwt', {
      identification: email,
      password: password
    });
  },

  /**
   * Error
   */
  onSubmitError() {
    get(this, 'flashMessages').danger(
      'Please contact your organization owner, something went wrong.'
    );
  }
});
