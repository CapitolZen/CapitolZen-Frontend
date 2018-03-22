import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  model: false,
  loadModel: task(function*() {
    let model = yield this.get('store').query('event', { future: true });
    this.set('model', model);
  }).on('init')
});
