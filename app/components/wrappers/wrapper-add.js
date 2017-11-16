import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import { task } from 'ember-concurrency';
import WrapperValidations from '../../validators/wrapper-draft';

export default FormComponent.extend({
  store: service(),
  currentUser: service(),
  router: service('router'),
  init() {
    this._super(...arguments);
    let organization = get(this, 'currentUser.currentOrganization');
    let wrapper = get(this, 'store').createRecord('wrapper', { organization });
    wrapper.set('metadata', { internaltitle: '' });
    set(this, 'model', wrapper);
    let changeset = new Changeset(
      wrapper,
      lookupValidator(WrapperValidations),
      WrapperValidations
    );
    set(this, 'changeset', changeset);
  },
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
  }).on('init')
});
