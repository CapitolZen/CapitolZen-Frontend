import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { task, waitForProperty } from 'ember-concurrency';
import { alias } from '@ember/object/computed';

export default Component.extend({
  router: service(),
  store: service(),
  groupModel: null,
  stepList: A([
    'Select Group',
    'Input Bills',
    'Add Details',
    'Pick A Format',
    'Publish'
  ]),
  componentList: A(['group', 'input', 'configure', 'select', 'publish']),
  step: null,
  reportType: alias('config.reportType'),

  init() {
    this._super(...arguments);
    if (!get(this, 'step')) {
      set(this, 'step', 0);
    }
    //get(this, 'groupLoader').perform();
  },
  config: {},
  updateConfig(config) {
    let currentConfig = get(this, 'config');
    console.log(config);
    currentConfig = Object.assign(currentConfig, config);
    set(this, 'config', currentConfig);
  },

  progressValue: computed(function() {
    let step = get(this, 'step'),
      total = get(this, 'stepList.length');
    step = ++step;
    return step / total * 100;
  }),

  groupLoader: task(function*() {
    yield waitForProperty(this, 'config.groupId');
    let id = get(this, 'config.groupId');
    let group = yield get(this, 'store').findRecord('group', id);
    this.updateConfig({ group });
  }),

  updateParams() {
    let config = get(this, 'config');
    let params = { step: get(this, 'step') };

    // We don't want to bother with jamming all this into a query param for no reason
    if (config.wrappers) {
      delete config.wrappers;
    }

    params = Object.assign(params, config);
    get(this, 'router').transitionTo({ queryParams: params });
  },
  stepDescription: computed('step', function() {
    return get(this, 'stepList')[get(this, 'step')];
  }),
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
