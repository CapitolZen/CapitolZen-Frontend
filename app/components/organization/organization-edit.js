import { inject as service } from '@ember/service';
import { set, get, computed } from '@ember/object';
import OrganizationValidations from '../../validators/organization';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';

import { US_STATES } from 'common/constants';

export default FormComponent.extend({
  flashMessages: service(),
  features: service(),
  validator: OrganizationValidations,
  states: computed(function() {
    return US_STATES;
  }),
  model: computed(function() {
    return get(this, 'organization');
  }),

  onSubmitSuccess(org) {
    set(this, 'features.clientLabel', org.get('clientLabel'));
    set(this, 'features.clientLabelPlural', org.get('clientLabelPlural'));
    get(this, 'flashMessages').success('Organization Updated');
  }
});
