import { next } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

import InviteValidations from '../../validators/invite';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

import FormComponent from 'ember-junkdrawer/components/form/changeset-form';

export default FormComponent.extend({
  session: service(),
  store: service(),
  flashMessages: service(),

  modalOpen: false,
  newInvite: null,
  organizationRoles: ['Member', 'Admin'],

  /**
   * Model setup
   */
  initModel() {
    let model = this.get('store').createRecord('invite', {
      organization: this.get('organization'),
      status: 'unclaimed',
      metadata: {
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
    refreshUserInvites() {
      const self = this;
      this.set('newInvite', false);
      next(function() {
        self.set('newInvite', true);
      });
      this.sendAction('refreshUserInvites');
    },

    openInviteModal() {
      this.set('modalOpen', true);
    },

    closeInviteModal() {
      this.set('modalOpen', false);
    }
  }
});
