import { inject as service } from '@ember/service';
import EmberObject, { computed, set, get } from '@ember/object';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import { alias } from '@ember/object/computed';
import UserValidation from '../../../validators/invite';
import { task } from 'ember-concurrency';

export default FormComponent.extend({
  ajax: service(),
  store: service(),
  flashMessages: service(),
  model: computed('group', function() {
    return EmberObject.create({
      email: '',
      name: '',
      page: get(this, 'page.id'),
      organization: get(this, 'page.organization.id')
    });
  }),
  validator: UserValidation,
  onSubmit() {},
  // Override base method
  submit: task(function*(changeset) {
    let props = changeset.getProperties([
      'email',
      'name',
      'page',
      'organization'
    ]);

    let response = yield this.get('ajax').post('users/create_guest/', {
      data: props
    });
    get(this, 'onSubmit')(response);
  })
});
