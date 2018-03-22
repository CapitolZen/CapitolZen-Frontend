import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  currentUser: service(),
  pageSize: 24,
  'timeout-ms': 0,

  _resetDataset() {
    get(this, 'records').reset(0);
  },

  actions: {
    filter() {
      this._resetDataset();
    },

    observeDataset(dataset) {
      set(this, 'records', dataset);
    },

    initializeReadOffset(dataset) {
      dataset.setReadOffset(0);
    },

    fetch(pageOffset, pageSize, stats) {
      let query = {
        page: 1 + pageOffset,
        page_size: pageSize,
        organization: this.get('currentUser.organization.id')
      };

      return this.get('store')
        .query('user', query)
        .then(data => {
          let meta = data.get('meta');
          stats.totalPages = meta.totalPages;
          return data.toArray();
        });
    }
  }
});
