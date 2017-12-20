import { inject as service } from '@ember/service';
import { set, get, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import OrganizationValidations from '../../validators/organization';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';

import { US_STATES } from 'common/constants';

export default FormComponent.extend({
  flashMessages: service(),
  validator: OrganizationValidations,

  states: computed(function() {
    return US_STATES;
  }),

  model: computed(function() {
    return get(this, 'organization');
  }),

  onSubmitSuccess() {
    get(this, 'flashMessages').success('Organization Updated');
  }
});
