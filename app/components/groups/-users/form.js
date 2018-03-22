import { inject as service } from '@ember/service';
import EmberObject, { computed, set, get } from '@ember/object';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import { alias } from '@ember/object/computed';
import UserValidation from '../../../validators/invite';
import { task } from 'ember-concurrency';

export default FormComponent.extend({
  ajax: service(),
  flashMessages: service(),
  model: computed('group', function() {
    return EmberObject.create({
      email: '',
      name: '',
      group: get(this, 'group.id'),
      organization: get(this, 'group.organization.id')
    });
  }),
  validator: UserValidation,
  onSubmit() {},
  // Override base method
  submit: task(function*(changeset) {
    let props = changeset.getProperties([
      'email',
      'name',
      'group',
      'organization'
    ]);

    let { data } = yield get(this, 'ajax').post('users/create_guest/', {
      data: props
    });

    get(this, 'onSubmit')(data);
  })
});
