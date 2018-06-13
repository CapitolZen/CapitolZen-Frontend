import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';

import InviteValidations from '../../validators/invite';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';

export default FormComponent.extend({
  session: service(),
  store: service(),
  flashMessages: service(),

  modalOpen: false,
  newInvite: null,
  organizationRoles: ['Member', 'Admin'],

  validator: InviteValidations,

  model: computed(function() {
    return this.get('store').createRecord('invite', {
      status: 'unclaimed',
      metadata: {
        organization_role: 'Member'
      }
    });
  }),

  /**
   * Success
   */
  onSubmitSuccess() {
    this.get('parentComponent')._resetDataset();
    get(this, 'flashMessages').success('Invite Created');
    this.set('modalOpen', false);
    this.notifyPropertyChange('model');
    this.initFormData();
  },

  actions: {
    openInviteModal() {
      this.set('modalOpen', true);
    },

    closeInviteModal() {
      this.set('modalOpen', false);
    }
  }
});
