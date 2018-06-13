import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import organizationBillingInfo from '../../../validators/organizationBillingInfo';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';

export default FormComponent.extend({
  flashMessages: service(),
  standalone: true,
  parentComponent: false,

  validator: organizationBillingInfo,

  model: computed(function() {
    return get(this, 'organization');
  }),

  onSubmitSuccess() {
    if (get(this, 'standalone')) {
      get(this, 'flashMessages').success('Billing Information Updated');
    }

    if (get(this, 'parentComponent')) {
      get(this, 'parentComponent').billingStepCompleted();
    }
  }
});
