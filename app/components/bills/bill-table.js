import Component from '@ember/component';
import { computed, set, get } from '@ember/object';
import moment from 'moment';
import TableCommon from '../../mixins/table-common';

export default Component.extend(TableCommon, {
  model: 'bills',
  tableHeight: '100vh',
  pager: true,
  sort: 'state_id',
  dateFilterType: 'active',
  dateFilterOptions: ['active', 'introduced'],
  columns: computed(function() {
    return [
      {
        label: 'State ID',
        valuePath: 'stateId',
        sortable: true
      },
      {
        label: 'Sponsor',
        valuePath: 'sponsor.fullName',
        sortable: false,
        breakpoints: ['mobile', 'tablet', 'desktop']
      },
      {
        label: 'Party',
        valuePath: 'sponsor.party',
        sortable: false,
        breakpoints: ['tablet', 'desktop']
      },
      {
        label: 'Last Action',
        valuePath: 'lastActionDate',
        cellComponent: 'bills/bill-table-date',
        sortable: false,
        breakpoints: ['mobile', 'tablet', 'desktop']
      },
      {
        label: 'Introduced',
        valuePath: 'introducedDate',
        cellComponent: 'bills/bill-table-date',
        sortable: false,
        breakpoints: ['desktop', 'tablet']
      },
      {
        label: 'Actions',
        cellComponent: 'bills/bill-table-actions',
        sortable: false
      }
    ];
  }),
  dateFilters: {
    startDate: moment('2017-01-01'),
    endDate: moment().endOf('day')
  },

  presets: computed(function() {
    return [
      {
        label: 'Today',
        start: moment().startOf('day'),
        end: moment().endOf('day')
      },
      {
        label: 'This Week',
        start: moment()
          .day(0)
          .startOf('day'),
        end: moment().endOf('day')
      },
      {
        label: 'Last month',
        start: moment()
          .subtract(1, 'month')
          .startOf('month'),
        end: moment()
          .subtract(1, 'month')
          .endOf('month')
      }
    ];
  }),
  actions: {
    filter() {
      let rq = get(this, 'recordQuery');
      rq[`${get(this, 'dateFilterType')}_range`] = `${get(
        this,
        'dateFilters.startDate'
      ).toISOString()},${get(this, 'dateFilters.endDate').toISOString()}`;
      set(this, 'recordQuery', rq);
      this.resetTable();
    },
    updateDateFilter(filters) {
      set(this, 'dateFilters', filters);
    }
  }
});
