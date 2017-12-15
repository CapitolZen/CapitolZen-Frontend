import { inject as service } from '@ember/service';
import { computed, set, get } from '@ember/object';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import { task } from 'ember-concurrency';
import WrapperValidations from '../../validators/wrapper-draft';

export default FormComponent.extend({
  store: service(),
  currentUser: service(),
  router: service(),
  wrapper: false,
  model: computed(function() {
    if (get(this, 'wrapper')) {
      return get(this, 'wrapper');
    }

    let organization = get(this, 'currentUser.currentOrganization');
    let bill = null;
    let wrapper = get(this, 'store').createRecord('wrapper', {
      organization,
      bill
    });
    wrapper.set('metadata', { internaltitle: '' });
    return wrapper;
  }),
  validator: WrapperValidations,
  submitAction() {},
  onSubmitSuccess(data) {
    if (get(this, 'wrapper')) {
      get(this, 'flashMessages').success(`Draft Updated!`);
      get(this, 'submitAction')();
    } else {
      get(this, 'flashMessages').success(`New Draft Bill Saved!`);
      get(this, 'router').transitionTo(
        'groups.detail.bills',
        get(data, 'group.id')
      );
    }
  },
  groupList: task(function*() {
    let groups = yield get(this, 'store').findAll('group');
    groups = groups.sortBy('title');
    set(this, 'groups', groups);
  }).on('init')
});
