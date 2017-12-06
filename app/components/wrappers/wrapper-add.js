import { inject as service } from '@ember/service';
import { computed, set, get } from '@ember/object';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import { task } from 'ember-concurrency';
import WrapperValidations from '../../validators/wrapper-draft';

export default FormComponent.extend({
  store: service(),
  currentUser: service(),
  router: service(),
  model: computed(function() {
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
  onSubmitSuccess(data) {
    get(this, 'flashMessages').success(`New Draft Bill Saved!`);
    get(this, 'router').transitionTo(
      'groups.detail.bills',
      get(data, 'group.id')
    );
  },
  groupList: task(function*() {
    let groups = yield get(this, 'store').findAll('group');
    groups = groups.sortBy('title');
    set(this, 'groups', groups);
  }).on('init'),
  submit: task(function*(changeset) {
    let ex = changeset.execute();
    console.log(ex);

    debugger;
    return yield changeset
      .save()
      .then(data => {
        this.onSubmitSuccess(data);
      })
      .catch(data => {
        this.handleServerFormErrors(data);
        this.setFormState('default');
        this.onServerError(data);
      });
  }).drop()
});
