import { inject as service } from '@ember/service';
import { set, get, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import OrganizationValidations from '../../validators/organization';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';

export default FormComponent.extend({
  session: service(),
  store: service(),
  currentUser: service(),
  flashMessages: service(),

  validator: OrganizationValidations,
  model: computed(function() {
    return get(this, 'organization');
  }),

  onSubmitSuccess() {
    get(this, 'flashMessages').success('Organization Updated');
  }
});
