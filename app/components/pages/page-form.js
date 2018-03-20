import { inject as service } from '@ember/service';
import { computed, set, get } from '@ember/object';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import PageEdit from '../../validators/page-edit';
import { alias } from '@ember/object/computed';
import { A } from '@ember/array';

export default FormComponent.extend({
  store: service(),
  flashMessages: service(),
  router: service(),
  model: alias('page'),
  validator: PageEdit,
  assignedToOptions: computed(function() {
    return this.get('store').query('user', {});
  }),
  visibilityOptions: A(['organization', 'anyone']),
  statusOptions: A(['draft', 'published']),
  onSubmitSuccess(model) {
    get(this, 'flashMessages').success('New Page Created!');
    get(this, 'router').transitionTo(
      'groups.detail.pages.index',
      model.get('group.id')
    );
  }
});
