import { inject as service } from '@ember/service';
import { computed, set, get } from '@ember/object';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import PageEdit from '../../validators/page-edit';
import { alias } from '@ember/object/computed';
import { A } from '@ember/array';
import { task, timeout } from 'ember-concurrency';

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
  searchGroups: task(function*(term) {
    yield timeout(500);
    return this.get('store').query('group', { search: term });
  }),
  onSubmitSuccess(model) {
    get(this, 'flashMessages').success('New Page Created!');
    get(this, 'router').transitionTo('page-admin.updates', model.get('id'));
  },
  actions: {
    addUser(user) {
      console.log(user);
      debugger;
      this.get('store').pushPayload('user', user);
      let model = this.get('store').peekRecord('user', user.data.id);
      this.get('changeset')
        .get('viewers')
        .pushObject(model);
      this.set('openAddViewer', false);
    }
  }
});
