import { inject as service } from '@ember/service';
import { set, get, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import OrganizationValidations from '../../validators/organization';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import FormComponent from 'ui/components/form/base-model-form';

export default FormComponent.extend({
  session: service(),
  store: service(),
  currentUser: service(),
  flashMessages: service(),

  /**
   * Model setup
   */
  initModel() {
    this.set('model', get(this, 'organization'));

    let changeset = new Changeset(
      get(this, 'organization'),
      lookupValidator(OrganizationValidations),
      OrganizationValidations
    );
    this.set('changeset', changeset);
  },

  /**
   * Success
   */
  onSubmitSuccess() {
    get(this, 'flashMessages').success('Organization Updated');
  },

  /**
   * Failure
   */
  onServerError() {}
});
