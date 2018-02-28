import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  presentation: 'grid',
  store: service(),
  media: service(),
  currentUser: service(),
  filters: {
    title__icontains: '',
    active: 1,
    assigned_to: null,
    assigned_to_other: null
  },

  facetsToggled: false,
  facetsCollapsed: computed('facetsToggled', function() {
    return this.get('media').get('isMobile') && !this.get('facetsToggled');
  }),

  assignedToOptions: computed(function() {
    return this.get('store').findAll('user');
  }),

  pageSize: 24,
  'timeout-ms': 0,
  _resetDataset() {
    get(this, 'records').reset(0);
  },

  actions: {
    toggleMobileFacets() {
      this.toggleProperty('facetsToggled');
    },
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
        page_size: pageSize
      };

      if (this.get('filters')['title__icontains']) {
        query['title__icontains'] = this.get('filters')['title__icontains'];
      }

      if (this.get('filters')['active'] !== null) {
        query['active'] = this.get('filters')['active'];
      }

      if (this.get('filters')['assigned_to'] === 'me') {
        query['assigned_to'] = this.get('currentUser')
          .get('user')
          .get('id');
      }

      if (this.get('filters')['assigned_to'] === 'other') {
        query['assigned_to'] = this.get('filters')['assigned_to_other'].get(
          'id'
        );
      }

      return this.get('store')
        .query('group', query)
        .then(data => {
          let meta = data.get('meta');
          stats.totalPages = meta.totalPages;
          return data.toArray();
        });
    }
  }
});
