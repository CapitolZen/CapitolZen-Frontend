import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { alias, and } from '@ember/object/computed';
import { A } from '@ember/array';

export default Component.extend({
  store: service(),
  preview: false,
  groupId: alias('config.groupId'),
  isLoading: alias('loadWrappers.isLoading'),
  recordsLoaded: and('loadWrappers.isIdle', 'wrappers.length'),
  currentPage: 0,
  wrappers: A(),
  maxPage: null,
  canLoadMore: computed('currentPage', 'maxPage', function() {
    let maxPage = get(this, 'maxPage');
    if (!maxPage) {
      return true;
    }
    return get(this, 'currentPage') < maxPage;
  }),
  didReceiveAttrs() {
    this._super(...arguments);
    get(this, 'loadWrappers').perform();
  },
  queryParams: computed('currentPage', 'groupId', function() {
    let group = get(this, 'groupId'),
      page = get(this, 'currentPage');

    let params = { group, page };
    if (get(this, 'preview')) {
      params.pageSize = 15;
    }

    return params;
  }),

  loadWrappers: task(function*() {
    if (get(this, 'canLoadMore')) {
      let records = yield get(this, 'store').query('wrapper', {
        group: get(this, 'groupId')
      });
      let meta = records.get('meta');
      let { pages, page } = meta.pagination;

      get(this, 'wrappers').addObjects(records);
      set(this, 'currentPage', ++page);
      set(this, 'maxPage', pages);
    }
  }),
  actions: {
    loadMore() {
      get(this, 'loadWrappers').perform();
    }
  }
});
