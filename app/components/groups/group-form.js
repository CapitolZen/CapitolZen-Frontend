import { inject as service } from '@ember/service';
import { computed, set, get } from '@ember/object';
import { typeOf, isEmpty } from '@ember/utils';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import FormComponent from 'ui/components/form/base-model-form';
import ClientValidations from '../../validators/client';

export default FormComponent.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  router: service('router'),
  isEditing: false,
  toggleEnabled: true,

  /*
   * Model setup
   */
  initModel() {
    if (this.get('group')) {
      this.set('model', this.get('group'));
    } else {
      this.set(
        'model',
        this.get('store').createRecord('group', { active: true })
      );
    }

    let changeset = new Changeset(
      this.get('model'),
      lookupValidator(ClientValidations),
      ClientValidations
    );
    this.set('changeset', changeset);
  },

  /**
   * Success
   */
  onSubmitSuccess() {
    get(this, 'flashMessages').success('Client Saved');
  },

  /**
   * Failure
   */
  onServerError() {},

  actions: {
    saveGroupToUser() {}
  }
});
