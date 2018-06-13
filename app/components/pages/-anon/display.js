import Component from '@ember/component';
import { get, set } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Component.extend({
  store: service(),
  updateList: A(),
  classNames: ['mt-3'],
  currentPage: 0,
  totalPages: 1,
  init() {
    this._super(...arguments);
    get(this, 'loadUpdates').perform();
    let cachedUpdates = this.get('store').peekAll('update');
    this.get('updateList').addObjects(cachedUpdates);
  },
  loadUpdates: task(function*() {
    let group_page = get(this, 'page.id');
    if (this.get('currentPage') < this.get('totalPages')) {
      let updates = yield get(this, 'store').query('update', { group_page });
      let { page, pages } = updates.get('meta.pagination');
      set(this, 'currentPage', page);
      set(this, 'totalPages', pages);
      get(this, 'updateList').addObjects(updates);
    }
  })
});
