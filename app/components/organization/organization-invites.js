import Ember from 'ember';

import InviteValidations from '../../validators/invite';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

const { Component, inject: { service }, get } = Ember;

export default Component.extend({
  session: service(),
  store: service(),
  flashMessages: service(),

  createInviteModalEnabled: false,
  newInvite: null,
  organizationRoles: ['Member', 'Admin'],
  InviteValidations,

  init() {
    this._super(...arguments);
    this.set('newInvite', this._singleInviteFactory());
  },

  actions: {
    refreshUserInvites() {
      const self = this;
      this.set('newInvite', false);
      Ember.run.next(function() {
        self.set('newInvite', true);
      });
      this.sendAction('refreshUserInvites');
    },

    openInviteModal() {
      const self = this;
      if (!this.get('newInvite')) {
        this.set('newInvite', this._singleInviteFactory());
      }
      this.set('createInviteModalEnabled', true);
    },

    closeInviteModal() {
      this.set('newInvite', null);
      this.set('createInviteModalEnabled', false);
    },

    inviteNewUsersSubmit(newInvite) {
      newInvite
        .save()
        .then(res => {
          debugger;
          console.log(res);
          this.set('newInvite', false);
          this.set('createInviteModalEnabled', false);
          get(this, 'flashMessages').success('Invite Created');
        })
        .catch(() => {});
    }
  },

  /**
   * @private
   */
  _singleInviteFactory() {
    let invite = this.get('store').createRecord('invite', {
      organization: this.get('organization'),
      status: 'unclaimed',
      metadata: {
        organization_role: 'Member'
      }
    });
    this.set('invite', invite);
    return new Changeset(
      invite,
      lookupValidator(InviteValidations),
      InviteValidations
    );
  }
});
