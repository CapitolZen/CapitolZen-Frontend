import { inject as service } from '@ember/service';
import { computed, set, get } from '@ember/object';
import { typeOf, isEmpty } from '@ember/utils';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import ClientValidations from '../../validators/client';

export default FormComponent.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  router: service('router'),
  isEditing: false,
  toggleEnabled: true,

  validator: ClientValidations,
  model: computed(function() {
    let group = get(this, 'group');
    set(group, 'organization', get(this, 'organization'));
    return group;
  }),

  /**
   * Success
   */
  onSubmitSuccess() {
    get(this, 'flashMessages').success('Client Saved');
    get(this, 'router').transitionTo('groups.index');
  },

  actions: {
    saveGroupToUser() {}
  }
});
