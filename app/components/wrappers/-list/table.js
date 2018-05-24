import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

const actionCellComponent = { component: 'wrappers/-list/cell/actions' };

export default Component.extend({
  ajax: service(),
  currentUser: service(),
  recordType: 'wrapper',
  sort: 'stateId',
  filtering: true,
  group: null,
  groupId: null,
  tableOptions: null,
  init() {
    this._super(...arguments);
    this.set('tableOptions', {
      height: '65vh',
      canSelect: true,
      responsive: true
    });
  },

  defaultRecordQuery: computed(function() {
    let query = {};

    if (this.get('group')) {
      query['group'] = this.get('group.id');
    }

    if (this.get('groupId')) {
      query['group'] = this.get('groupId');
    }

    if (this.get('report')) {
      query['report'] = this.get('report.id');
    }

    return query;
  }),

  columns: computed('actionCellComponent', function() {
    let columns = [
      {
        width: '40px',
        sortable: false,
        cellComponent: 'table/row-toggle',
        breakpoints: ['mobile', 'tablet']
      },
      {
        label: 'Bill ID',
        valuePath: 'bill.stateId',
        sortable: true,
        cellComponent: 'wrappers/-list/cell/title'
      },
      {
        label: 'Position',
        cellComponent: 'wrappers/-list/cell/position'
      },
      {
        label: 'Summary',
        valuePath: 'bill.title',
        breakpoints: ['desktop'],
        cellClassNames: ['smaller-text']
      },
      {
        label: 'Sponsor',
        cellComponent: 'bills/-list/cell/sponsor',
        sortable: false,
        breakpoints: ['mobile', 'tablet', 'desktop']
      },
      {
        label: 'Recent Activity',
        cellComponent: 'bills/-list/cell/status',
        sortable: false,
        breakpoints: ['tablet', 'desktop']
      },
      {
        label: 'Actions',
        cellComponent: actionCellComponent.component,
        sortable: false,
        align: 'right',
        extra: actionCellComponent.extras
      }
    ];

    if (!get(this, 'tableOptions.expandOnClick')) {
      columns.splice(0, 1);
    }

    return columns;
  }),
  downloadWrappers: task(function*() {
    let group = this.get('group.id'),
      title = `${this.get('group.title')} Saved Bills`;

    let {
      data: { url }
    } = yield this.get('ajax').post('/reports/generate/', {
      data: { group, title }
    });

    let link = document.createElement('a');
    link.setAttribute('href', url);

    link.click();
    this.get('currentUser').event('report:download');
  }),
  actions: {
    /**
     * Post Table Setup Hook
     */
    postTableSetup(table) {
      this.set('table', table);
    },

    /**
     * Alter pojo represents query filtering before sending it over.
     * @param query
     * @returns {*}
     */
    preFilterAlter(query) {
      if (query.hasOwnProperty('search')) {
        if (get(this, 'searchParams') !== query.search) {
          set(this, 'searchParams', query.search);
          return {
            search: query.search.toLowerCase()
          };
        }
      }
      return query;
    }
  }
});
