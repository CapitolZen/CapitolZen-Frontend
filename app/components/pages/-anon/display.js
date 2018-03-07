import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Component.extend({
  store: service(),
  updateList: A(),
  classNames: ['mt-3'],
  init() {
    this._super(...arguments);
    get(this, 'loadUpdates').perform();
  },
  loadUpdates: task(function*() {
    let group_page = get(this, 'page.id');
    let updates = yield get(this, 'store').query('update', { group_page });
    console.log(updates);
    get(this, 'updateList').addObjects(updates);
  })
});
