import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
  changeSelectedPlan(plan) {
    this.set('selectedPlan', plan);
  },

  currentPlan: computed('model', function() {
    if (this.get('model')['billing']['subscription']['plan']['id']) {
      return this.get('model')['billing']['subscription']['plan']['id'];
    }
    return false;
  }),

  selectedPlan: false,

  canChangePlan: computed('selectedPlan', 'currentPlan', function() {
    return this.get('currentPlan') !== this.get('selectedPlan');
  }),

  plans: computed('selectedPlan', 'currentPlan', function() {
    let currentPlan = this.get('currentPlan');

    let plans = [
      {
        id: 'free',
        name: 'Free - Forever',
        icon: 'rocket',
        points: ['Is Free', 'Limited Functionality'],
        cost: '$0.00 per month',
        current: false,
        selected: false
      },
      {
        id: 'pro-team',
        name: 'Pro - Team',
        icon: 'rocket',
        points: ['Is Not Free', 'Full Functionality'],
        cost: '$200.00 per month',
        current: false,
        selected: false
      }
    ];

    // Set current plan
    plans.forEach((plan, index) => {
      if (plan['id'] === currentPlan) {
        plans[index]['current'] = true;
      }

      if (
        plan['id'] === this.get('selectedPlan') ||
        (this.get('selectedPlan') === false && plan['id'] === currentPlan)
      ) {
        plans[index]['selected'] = true;
      }
    });

    return plans;
  }),

  /**
   * Replace the submit handler since we're not just running changeset.save
   */
  submit: task(function*() {
    let payload = {
      data: {
        type: 'organizations',
        attributes: {
          plan: this.get('selectedPlan')
        }
      }
    };

    return yield this.get('model.organization')
      .updatesubscription(payload)
      .then(data => {
        this.get('router').transitionTo('organization.billing');
        return true;
      })
      .catch(e => {
        throw e;
      });
  }).drop(),

  /**
   * Actions
   */
  actions: {
    changeSubscription() {
      console.log('changeSubscription');
      return this.get('submit').perform();
    }
  }
});
