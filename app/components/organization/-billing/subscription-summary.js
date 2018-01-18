import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',
  planCost: computed('model', function() {
    if (this.get('model.billing.subscription.plan.amount')) {
      return this.get('model.billing.subscription.plan.amount') / 100;
    }
    return 0.0;
  })
});
