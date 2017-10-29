import EmberObject, { set, get } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

import FormComponent from 'ui/components/form/base-model-form';
import { task } from 'ember-concurrency';

export default FormComponent.extend({
  flashMessages: service(),
  ajax: service(),
  store: service(),
  session: service(),
  defaultObject: null,
  init() {
    this._super(...arguments);
    let obj = EmberObject.create({ email: get(this, 'invite.email') });
    set(this, 'defaultObject', obj);
  },
  actions: {
    acceptInvite(user) {
      let { email, password, name } = user;
      let inviteId = get(this, 'invite.id');

      get(this, 'ajax')
        .post(`invites/${inviteId}/claim/`, {
          data: {
            password,
            name
          }
        })
        .then(() => {
          return get(this, 'session').authenticate('authenticator:jwt', {
            identification: email,
            password: password
          });
        })
        .then(() => {
          get(this, 'flashMessages').success(`Welcome to Capitol Zen!`);
        })
        .catch(() => {
          get(this, 'flashMessages').danger(
            'Please contact your organization owner, something went wrong.'
          );
        });
    }
  }
});
