import Mixin from '@ember/object/mixin';
import moment from 'moment';
import { get, set, computed } from '@ember/object';

let filters = {
  startDate: moment().startOf('day'),
  endDate: moment().endOf('day')
};

let presets = [
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
    start: moment()
      .subtract(1, 'year')
      .startOf('year'),
    end: moment()
      .subtract(1, 'year')
      .endOf('year')
  }
];

export default Mixin.create({
  dateFilters: null,
  presets: null,
  dateFilterType: null,
  dateFilterOptions: ['active', 'introduced'],
  latestDate: moment(),
  init() {
    this._super(...arguments);
    set(this, 'presets', presets);
    set(this, 'dateFilters', filters);
    set(this, 'dateFilterType', 'active');
  },
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
