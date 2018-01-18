import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),

  init() {
    this._super(...arguments);

    //
    // Set the initial active step based on info we know.
    if (!this.get('model.organization.billing_address_one')) {
      this.set('activeStep', 'billing');
    } else if (!this.get('model.billing.customer.sources.data').length) {
      this.set('activeStep', 'card');
    } else {
      this.set('activeStep', 'plan');
    }
  },

  /**
   * 1) "billing"
   * 2) "card"
   * 3) "plan"
   */
  activeStep: false,

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

  /**
   * Determines if we show the final "checkout" button.
   */
  canChangePlan: computed('selectedPlan', 'currentPlan', function() {
    return (
      this.get('currentPlan') !== this.get('selectedPlan') &&
      this.get('selectedPlan') !== false
    );
  }),

  /**
   * Callback for when card step is completed.
   */
  cardStepCompleted() {
    this.set('activeStep', 'plan');
  },

  /**
   * Billing Step Completed
   */
  billingStepCompleted() {
    this.set('activeStep', 'card');
  },

  /**
   *
   */
  plans: computed('selectedPlan', 'currentPlan', function() {
    let currentPlan = this.get('currentPlan');

    let plans = [
      {
        id: 'basic',
        name: 'Basic',
        icon: 'leaf',
        points: [
          {
            label: 'One Client Limit',
            icon: 'times-circle-o'
          },
          {
            label: 'One User Limit',
            icon: 'times-circle-o'
          },
          {
            label: 'One Report Limit',
            icon: 'times-circle-o'
          },
          {
            label: '10 Saved Bills Limit',
            icon: 'times-circle-o'
          },
          {
            label: 'Capitol Zen Branding Added To Reports',
            icon: 'times-circle-o'
          }
        ],
        cost: '$0.00 per month',
        current: false,
        selected: false
      },
      {
        id: 'professional',
        name: 'Professional',
        icon: 'rocket',
        points: [
          {
            label: 'Unlimited Clients',
            icon: 'check-circle-o'
          },
          {
            label: 'Unlimited teammates',
            icon: 'check-circle-o'
          },
          {
            label: 'Unlimited Reports',
            icon: 'check-circle-o'
          },
          {
            label: 'Unlimited Saved Bills',
            icon: 'check-circle-o'
          },
          {
            label: 'Whitelabeled Reports',
            icon: 'check-circle-o'
          }
        ],
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
      return this.get('submit').perform();
    }
  }
});
