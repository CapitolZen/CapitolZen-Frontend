import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  reportType: alias('config.reportType'),
  wrappers: alias('config.wrappers'),
  init() {
    this._super(...arguments);
    if (get(this, 'config.groupId') && !get(this, 'wrappers')) {
      get(this, 'wrapperLoader').perform();
    }
  },
  wrapperLoader: task(function*() {
    let wrappers = yield get(this, 'store').query('wrapper', {
      group: get(this, 'config.groupId')
    });
    set(this, 'wrapperList', wrappers);
  }),
  actions: {
    saveAll() {
      let forms = document.querySelectorAll('form');
      if (forms.length > 0) {
        let event = new Event('submit', { cancelable: true, bubbles: true });
        Array.prototype.slice.call(forms).forEach(form => {
          form.dispatchEvent(event);
        });
      }

      get(this, 'onComplete')(2);
    }
  }
});
