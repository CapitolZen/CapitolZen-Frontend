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
    this.set('model', this.get('group'));

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
  },

  /**
   * Automatically destroy any models that were created and then left around.
   * TODO: can we detect if model is a pojo or a ember model object?
   * if so we should move this to the main base-form.
   */
  willDestroyElement() {
    this._super(...arguments);
    if (!this.get('model.id')) {
      this.get('model').deleteRecord();
    }
  }
});
