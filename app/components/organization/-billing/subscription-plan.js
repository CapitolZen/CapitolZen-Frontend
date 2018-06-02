import Component from '@ember/component';

import { computed } from '@ember/object';

export default Component.extend({
  classNameBindings: ['actualClassNames'],

  isCurrentPlan: computed('plan', function() {
    return this.get('plan.current');
  }),

  isSelectedPlan: computed('plan', function() {
    return this.get('plan.selected');
  }),

  actualClassNames: computed('plan', function() {
    let classes = 'card subscription-plan';

    if (this.get('plan')['current']) {
      classes += ' current';
    }

    if (this.get('plan')['selected']) {
      classes += ' selected';
    }

    return classes;
  }),

  actions: {
    selectPlan(plan) {
      this.get('parentComponent').changeSelectedPlan(plan);
    }
  }
});
