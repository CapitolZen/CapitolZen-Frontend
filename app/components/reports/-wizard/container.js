import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  stepList: A(['Select Type', 'Input Bills', 'Add Details', 'Publish']),
  step: 0,
  init() {
    this._super(...arguments);
    get(this, 'setupGroups').perform();
  },
  setupGroups: task(function*() {
    let groups = get(this, 'store').findAll('group');
    set(this, 'groups', groups);
  }),

  stepDescription: computed('step', function() {
    return get(this, 'stepList')[get(this, 'step')];
  }),
  componentList: A(['']),
  setComponent: computed(),
  actions: {
    setSubject(type) {
      set(this, 'reportSubject', type);
      set(this, 'step', 1);
    },
    nextStep() {
      this.incrementProperty('step');
    }
  }
});
