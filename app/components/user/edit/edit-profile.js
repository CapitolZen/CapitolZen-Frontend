import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import UserValidations from '../../../validators/user';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';

export default FormComponent.extend({
  tagName: '',
  flashMessages: service(),

  /**
   * Model setup
   */
  initModel() {
    let changeset = new Changeset(
      get(this, 'user'),
      lookupValidator(UserValidations),
      UserValidations
    );
    this.set('changeset', changeset);
    let model = get(this, 'user');

    this.set('model', model);
  },

  /**
   * Success
   */
  onSubmitSuccess() {
    get(this, 'flashMessages').success('Account Updated');
  },

  /**
   * Failure
   */
  onServerError() {}
});
