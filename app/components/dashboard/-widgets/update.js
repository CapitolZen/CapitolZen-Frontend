import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { all, allSettled } from 'rsvp';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Component.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  init() {
    this._super(...arguments);
    this.get('fetchGroups').perform();
  },
  groupList: null,
  pageList: null,
  selectedGroups: null,
  fetchGroups: task(function*() {
    let groups = yield this.get('store').query('group', { has_page: true });
    set(this, 'groupList', groups);
  }),
  fetchPage: task(function*(group) {
    let page = yield this.get('store')
      .query('page', { group: group.get('id') })
      .then(data => {
        return data.get('firstObject');
      });

    this.get('pageList').addObject(page);
  }),
  disableSubmit: computed('selectedGroups', 'model', function() {
    return !this.get('selectedGroups.length');
  }),

  model: computed(function() {
    return this.get('store').createRecord('update', {
      organization: get(this, 'currentUser.organization'),
      user: get(this, 'currentUser.user')
    });
  }),
  submit: task(function*() {
    let pagePromises = get(this, 'selectedGroups').map(group => {
      return get(this, 'store')
        .query('page', { group: group.get('id') })
        .then(data => {
          return data.get('firstObject');
        });
    });

    let pages = yield all(pagePromises);

    let update = get(this, 'model');

    let { document, title } = update.getProperties(['document', 'title']);

    let promises = pages.map(page => {
      let copy = get(this, 'store').createRecord('update', {
        user: get(this, 'currentUser.user'),
        organization: get(this, 'currentUser.organization'),
        group: page.get('group'),
        page,
        document,
        title
      });

      return copy.save();
    });

    yield all(promises);
    get(this, 'flashMessages').success('Updates sent!');
  }),
  actions: {
    submit() {
      return this.get('submit').perform();
    }
  }
});