import layout from '../../templates/components/organization/organization-invites';

import FormComponent from 'ui/components/form/simple-form';

import { inject as service } from '@ember/service';
import { get } from '@ember/object';

import InviteValidations from '../../validators/invite';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

export default FormComponent.extend({
  layout,
  session: service(),
  store: service(),
  router: service(),
  flashMessages: service(),
  modalOpen: false,
  changeset: null,
  organizationRoles: ['Member', 'Admin'],

  /**
   * Model setup
   */
  initModel() {
    let model = this.get('store').createRecord('invite', {
      organization: this.get('organization'),
      status: 'unclaimed',
      meta_data: {
        organization_role: 'Member'
      }
    });

    this.set('model', model);

    let changeset = new Changeset(
      model,
      lookupValidator(InviteValidations),
      InviteValidations
    );

    this.set('changeset', changeset);
  },

  /**
   * Success
   */
  onSubmitSuccess() {
    this.get('invites').pushObject(this.get('model')._internalModel);
    get(this, 'flashMessages').success('Invite Created');
    this.set('modalOpen', false);

    // Will probably invite a bunch of users, so we reset the data.
    this.initModel();
  },

  /**
   * Failure
   */
  onServerError() {},

  actions: {
    refreshUserInvites() {},

    openInviteModal() {
      this.set('modalOpen', true);
    },

    closeInviteModal() {
      this.set('modalOpen', false);
    }
  }
});
