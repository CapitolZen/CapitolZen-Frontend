import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  stripev3: service(),

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
        console.log(e);
        throw e;
      });

    if (this.get('token')) {
      console.log('b');
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
        .then(data => {
          console.log(data);
          return true;
        })
        .catch(e => {
          console.log(e);
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
