import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  currentUser: service(),
  isLoading: false,
  pageSize: 12,
  'timeout-ms': 0,

  /**
   * @private
   */
  _resetDataset() {
    get(this, 'records').reset(0);
  },

  /**
   * @private
   */
  _refilterDataset() {
    get(this, 'records').filter();
  },

  /**
   * @param record
   * @returns {boolean}
   */
  filterCallback(record) {
    if (record) {
      return record.get('state') === 'active';
    }

    return false;
  },

  actions: {
    observeDataset(dataset) {
      this.set('isLoading', dataset.get('hasPending'));
      set(this, 'records', dataset);
    },

    initializeReadOffset(dataset) {
      dataset.setReadOffset(0);
    },

    refilterDataset() {
      this._refilterDataset();
    },

    fetch(pageOffset, pageSize, stats) {
      let query = {
        page: 1 + pageOffset,
        page_size: pageSize,
        state: 'active'
      };

      return this.get('store')
        .query('action', query)
        .then(data => {
          let meta = data.get('meta');
          stats.totalPages = meta.totalPages;
          return data.toArray();
        });
    }
  }
});
