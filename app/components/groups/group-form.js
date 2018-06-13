import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import ClientValidations from '../../validators/client';

export default FormComponent.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  router: service('router'),

  validator: ClientValidations,
  model: computed(function() {
    let group = get(this, 'group');
    group.set('organization', this.organization);
    return group;
  }),

  assignedToOptions: computed(function() {
    return this.get('store').query('user', { is_active: true });
  }),

  /**
   * Success
   */
  onSubmitSuccess() {
    get(this, 'flashMessages').success(
      `${get(this, 'features.clientLabel')} Saved!`
    );
    get(this, 'router').transitionTo('groups.index');
  },

  actions: {
    saveGroupToUser() {}
  }
});
