import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set, get, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

import OrganizationValidations from '../../validators/organization';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

export default Component.extend({
  session: service(),
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  init() {
    this._super(...arguments);
    set(this, 'changeLogo', isEmpty(get(this, 'organization.logo')));
    this.changeset = new Changeset(
      get(this, 'organization'),
      lookupValidator(OrganizationValidations),
      OrganizationValidations
    );
  },
  OrganizationValidations,

  changeLogo: false,
  logoName: computed({
    get() {
      let url = get(this, 'organization.logo');
      url = decodeURIComponent(url);
      if (!url || get(this, 'changeLogo')) {
        return false;
      }
      let peices = url.split('/');
      return peices.pop();
    },
    set(key, val) {
      let url = decodeURIComponent(val);
      let pieces = url.split('/');
      return pieces.pop();
    }
  }),

  actions: {
    submit: function(changeset) {
      changeset.execute();
      changeset
        .save()
        .then(() => {
          get(this, 'flashMessages').success('Organization Updated');
        })
        .catch(() => {
          get(this, 'flashMessages').success('Error Updated Organization');
        });
    },
    toggleEditing() {
      this.toggleProperty('isEditing');
    },
    handleResponse({ headers: { location } }) {
      let org = get(this, 'organization');
      org.set('logo', location);
      org.save().then(() => {
        set(this, 'changeLogo', false);
        get(this, 'flashMessages').success('Logo Updated');
      });
    },
    changeLogo() {
      this.toggleProperty('changeLogo');
    }
  }
});
