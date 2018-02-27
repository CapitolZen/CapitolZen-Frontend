import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
  stepList: A([
    'Select Group',
    'Select Type',
    'Input Bills',
    'Add Details',
    'Publish'
  ]),
  step: null,
  init() {
    this._super(...arguments);
    if (!get(this, 'step')) {
      set(this, 'step', 0);
    }
  },
  config: {},
  updateConfig(config) {
    let currentConfig = get(this, 'config');
    currentConfig = Object.assign(currentConfig, config);
    set(this, 'config', currentConfig);
    console.log(currentConfig);
  },
  updateParams() {
    let config = get(this, 'config');
    let params = { step: get(this, 'step') };
    params = Object.assign(params, config);
    get(this, 'router').transitionTo({ queryParams: params });
  },
  stepDescription: computed('step', function() {
    return get(this, 'stepList')[get(this, 'step')];
  }),
  componentList: A(['group', 'select', 'input', 'configure']),
  stepComponent: computed('step', function() {
    return `reports/-wizard/steps/${
      get(this, 'componentList')[get(this, 'step')]
    }`;
  }),
  actions: {
    setSubject(type) {
      set(this, 'reportSubject', type);
      set(this, 'step', 1);
    },
    nextStep(currentStep, config = {}) {
      let step = ++currentStep;
      set(this, 'step', step);
      this.updateConfig(config);
      this.updateParams();
    }
  }
});
