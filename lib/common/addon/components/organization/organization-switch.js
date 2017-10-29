import layout from '../../templates/components/organization/organization-switch';

import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  tagName: '',

  currentUser: service('current-user'),

  canCreate: computed(function() {
    return true;
  }),

  /**
   * Remove current org from the list of switchable orgs.
   */
  switchOrganizationList: computed('currentUser.organizations', function() {
    let orgs = [];
    this.get('currentUser.organizations').forEach(organization => {
      if (this.get('currentUser.organization.id') !== organization.get('id')) {
        orgs.push(organization);
      }
    });
    return orgs;
  }),

  canSwitch: computed('currentUser.organizations', function() {
    if (this.get('currentUser.organizations.length') > 1) {
      return true;
    }
    return false;
  }),

  actions: {
    switchOrganization(organization) {
      this.get('currentUser').switchOrganization(organization);
    }
  }
});
