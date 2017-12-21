import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import { task, timeout } from 'ember-concurrency';

export default FormComponent.extend({
  store: service(),
  flashMessages: service(),
  router: service(),
  model: alias('wrapper'),
  openConfirmModal: false,
  searchBills: task(function*(terms) {
    yield timeout(300);
    return get(this, 'store').query('bill', { search: terms });
  }),
  listGroups: task(function*() {
    let groups = yield get(this, 'store').findAll('group');
    set(this, 'groups', groups);
  }).on('init'),
  onSubmitSuccess() {
    get(this, 'flashMessages').success('Saved Bill Updated');
  },
  actions: {
    cancel() {
      return get(this, 'changeset').rollback();
    },
    confirmDelete() {
      let groupId = get(this, 'wrapper.group.id');
      let wrapper = get(this, 'wrapper');
      wrapper.destroyRecord().then(() => {
        get(this, 'flashMessages').success('Saved Bill Deleted');
        get(this, 'router').transitionTo('groups.detail.bills', groupId);
      });
    }
  }
});
