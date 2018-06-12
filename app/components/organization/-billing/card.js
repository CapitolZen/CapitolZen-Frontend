import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  stripev3: service(),
  flashMessages: service(),
  parentComponent: false,
  standalone: true,

  options: {
    hidePostalCode: true,
    style: {
      base: {
        color: '#333'
      }
    }
  },

  token: null,

  /**
   * Replace the submit handler since we're not just running changeset.save
   */
  submit: task(function*(stripeElement) {
    let stripe = get(this, 'stripev3');

    yield stripe
      .createToken(stripeElement)
      .then(({ token }) => {
        return set(this, 'token', token);
      })
      .catch(e => {
        get(this, 'flashMessages').danger('Card Failed To Update');
        throw e;
      });

    if (this.get('token')) {
      let payload = {
        data: {
          type: 'organizations',
          attributes: {
            token: this.get('token')
          }
        }
      };
      yield this.get('organization')
        .updatesource(payload)
        .then(() => {
          if (this.get('standalone')) {
            get(this, 'flashMessages').success('Card Updated');
          }

          if (this.get('parentComponent')) {
            this.get('parentComponent').cardStepCompleted();
          }

          return true;
        })
        .catch(e => {
          get(this, 'flashMessages').danger('Card Failed To Update');
          throw e;
        });
    }
  }).drop(),

  actions: {
    submit(stripeElement) {
      return this.get('submit').perform(stripeElement);
    }
  }
});
