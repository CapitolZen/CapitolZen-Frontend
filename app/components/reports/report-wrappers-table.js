import Component from '@ember/component';
import { get, getWithDefault, set, computed } from '@ember/object';
import TableCommon from '../../mixins/table-common';
import { task } from 'ember-concurrency';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default Component.extend(TableCommon, {
  model: A(),
  request: service(),
  store: service(),
  recordType: 'wrapper',
  tableHeight: '75vh',
  pager: true,
  fetchRecords: task(function*() {
    let filter = getWithDefault(this, 'model.filter', {});

    let { data, meta } = yield get(this, 'request').post(
      '/wrappers/filter_wrappers/',
      {
        data: {
          filters: filter,
          group: get(this, 'report.group.id')
        }
      }
    );

    let store = get(this, 'store');

    data.forEach(wrapper => {
      store.push(store.normalize('wrapper', wrapper));
      let peek = store.peekRecord('wrapper', wrapper.id);
      get(this, 'model').addObject(peek);
    });

    set(this, 'meta', meta);
    set(this, 'canLoadMore', !isEmpty(meta.next));
  }).restartable(),
  columns: computed(function() {
    return [
      {
        label: 'State ID',
        valuePath: 'bill.stateId',
        sortable: true
      },
      {
        label: 'Sponsor',
        valuePath: 'bill.sponsor.fullName',
        sortable: false,
        breakpoints: ['mobile', 'tablet', 'desktop']
      },
      {
        label: 'Party',
        valuePath: 'bill.sponsor.party',
        sortable: false,
        breakpoints: ['tablet', 'desktop']
      },
      {
        label: 'Last Action',
        valuePath: 'lastActionDate',
        cellComponent: 'bills/bill-table-status',
        sortable: false,
        breakpoints: ['mobile', 'tablet', 'desktop']
      },

      {
        label: 'Actions',
        cellComponent: 'wrappers/wrapper-table-actions',
        sortable: false
      }
    ];
  })
});
