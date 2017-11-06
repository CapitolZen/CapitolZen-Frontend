import Mixin from '@ember/object/mixin';
import moment from 'moment';
import { get, set, computed } from '@ember/object';

let filters = {
  startDate: moment().startOf('year'),
  endDate: moment()
};

export default Mixin.create({
  dateFilters: null,
  dateFilterType: null,
  dateFilterOptions: ['active', 'introduced'],
  latestDate: moment(),
  init() {
    this._super(...arguments);
    set(this, 'dateFilters', filters);
    set(this, 'dateFilterType', 'active');
  },
  presets: computed(function() {
    return [
      {
        label: 'Today',
        start: moment().startOf('day'),
        end: moment().endOf('day')
      },
      {
        label: 'Last Week',
        start: moment()
          .subtract(1, 'week')
          .startOf('week'),
        end: moment()
          .subtract(1, 'week')
          .endOf('week')
      },
      {
        label: 'Last Month',
        start: moment()
          .subtract(1, 'month')
          .startOf('month'),
        end: moment()
          .subtract(1, 'month')
          .endOf('month')
      },
      {
        label: 'This Session',
        start: moment().startOf('year'),
        end: moment()
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
      if (get(this, 'columns')) {
        this.resetTable();
      }
    },
    updateDateFilter(filters) {
      set(this, 'dateFilters', filters);
    }
  }
});
