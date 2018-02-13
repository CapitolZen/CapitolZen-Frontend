import Component from '@ember/component';
import { get, computed, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { A } from '@ember/array';

export default Component.extend({
  store: service(),
  media: service(),
  currentUser: service(),
  windoc: service(),
  facetsCollapsed: false,
  group: false,
  model: A(),
  filters: {
    search: '',
    group: null,
    sort_by: 'created',
    title: null,
    state: 'active'
  },
  sorts: 'created',
  sortsDirection: '-',
  type: false,
  titleOptions: A(['bill:introduced', 'wrapper:updated']),
  didReceiveAttrs() {
    this._super(...arguments);
    get(this, 'setupFacets').perform();
  },
  setupFacets: task(function*() {
    let groups = yield get(this, 'store').query('group', {
      active: true,
      assigned_to: get(this, 'currentUser.user_id'),
      sort: 'title'
    });

    if (get(this, 'group')) {
      let selected = groups.findBy('id', get(this, 'group'));
      set(this, 'filters.group', selected);
    } else {
      set(this, 'filters.group', { id: null, title: 'None' });
    }

    if (
      get(this, 'type') &&
      get(this, 'titleOptions').includes(get(this, 'type'))
    ) {
      set(this, 'filters.title', get(this, 'type'));
    }

    let list = groups.toArray();
    list.unshift({ id: null, title: 'None' });

    set(this, 'availableGroups', list);
    this._updateRecords();
  }),

  _updateRecords() {
    get(this, 'fetchRecords').perform();
  },
  // Prevent pagination fails
  cachedParams: null,

  fetchRecords: task(function*() {
    console.log(get(this, 'cachedParams'));
    let params = { pageSize: 12 };

    params.sort = `${get(this, 'sortsDirection')}${get(this, 'sorts')}`;
    let currentPage = get(this, 'currentPage');
    let filters = get(this, 'filters');

    if (filters.group && filters.group.id) {
      set(filters, 'group', filters.group.id);
    } else {
      set(filters, 'group', null);
    }

    params = Object.assign(filters, params);

    let currentParams = JSON.stringify(params);

    let paramsMatch = currentParams === get(this, 'cachedParams');
    set(this, 'cachedParams', currentParams);

    if (currentPage && paramsMatch) {
      params['page'] = currentPage;
    }

    if (!paramsMatch) {
      set(this, 'model', A());
    }

    try {
      let records = yield get(this, 'store').query('action', params);
      get(this, 'model').addObjects(records);
      let meta = records.get('meta');
      let { pages, page, count } = meta.pagination;
      page++;
      set(this, 'totalPages', pages);
      set(this, 'currentPage', page);
      set(this, 'totalRecordCount', count);
    } catch (e) {
      console.log(e);
    }
  }).drop(),
  recordsComplete: computed(
    'windoc.scrollTop',
    'windoc.scrollHeight',
    'totalRecordCount',
    'model.[]',
    function() {
      let top = get(this, 'windoc.scrollTop'),
        total = get(this, 'windoc.scrollHeight'),
        modelLength = get(this, 'model.length'),
        totalServerCount = get(this, 'totalRecordCount');

      if (top / total > 0.55 && modelLength < totalServerCount) {
        get(this, 'fetchRecords').perform();
      }
      return modelLength <= totalServerCount;
    }
  ),
  actions: {
    filter() {
      this._updateRecords();
    },
    toggleMobileFacets() {
      this.toggleProperty('facetsToggled');
    },
    dismissAction(action) {
      action.updateState('dismissed');
      action.save().then(() => {
        get(this, 'currentUser').event('action:dismiss');
        get(this, 'model').removeObject(action);
      });
    }
  }
});
