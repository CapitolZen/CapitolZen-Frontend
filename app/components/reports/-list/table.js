import Component from '@ember/component';
import { computed, get, set } from '@ember/object';

export default Component.extend({
  recordType: 'report',
  dir: 'asc',
  sort: false,

  tableOptions: {
    height: '65vh',
    responsive: true
  },
  defaultRecordQuery: computed(function() {
    let query = {};
    if (this.get('group')) {
      query['group'] = this.get('group.id');
    }
    return query;
  }),
  columns: computed(function() {
    let clientLabel = this.features.clientLabel;
    return [
      /*{
        width: '40px',
        sortable: false,
        cellComponent: 'table/row-toggle',
        breakpoints: ['mobile', 'tablet']
      },*/
      {
        label: 'Title',
        valuePath: 'title'
      },
      {
        label: clientLabel,
        cellComponent: 'reports/-list/cell/client'
      },
      {
        label: 'Author',
        valuePath: 'user.name',
        breakpoints: ['tablet', 'desktop']
      },
      {
        label: 'Created Date',
        valuePath: 'created',
        cellComponent: 'tools/tables/date-cell',
        breakpoints: ['tablet', 'desktop']
      },
      {
        label: 'Actions',
        cellComponent: 'reports/-list/cell/actions',
        align: 'right'
      }
    ];
  }),
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
});
