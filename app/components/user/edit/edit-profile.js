import { inject as service } from '@ember/service';
import { get, computed, set } from '@ember/object';
import UserValidations from '../../../validators/user';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import { task, timeout } from 'ember-concurrency';

export default FormComponent.extend({
  tagName: '',
  flashMessages: service(),
  validator: UserValidations,
  model: computed(function() {
    return get(this, 'user');
  }),

  /**
   * Success
   */
  onSubmitSuccess() {
    get(this, 'flashMessages').success('Account Updated');
  }
});
