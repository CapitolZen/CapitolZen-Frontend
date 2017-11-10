import { inject as service } from '@ember/service';
import { computed, set, get } from '@ember/object';
import { typeOf, isEmpty } from '@ember/utils';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
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
    let group = get(this, 'group');
    set(group, 'organization', get(this, 'organization'));
    set(this, 'model', group);

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
    get(this, 'router').transitionTo('groups.index');
  },

  /**
   * Failure
   */
  onServerError() {},

  actions: {
    saveGroupToUser() {}
  }
});
