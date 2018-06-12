import Component from '@ember/component';
import { get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import moment from 'moment';
import { A } from '@ember/array';

export default Component.extend({
  store: service(),
  didReceiveAttrs() {
    this._super(...arguments);
    get(this, 'fetchWrapperAction').perform();
  },
  actionList: A(),
  actionsCount: alias('actionList.length'),
  fetchGroup: task(function*() {
    let bill_modified_after = moment()
        .startOf('year')
        .toISOString(),
      group = get(this, 'group.id');

    let query = {
      group,
      bill_modified_after
    };

    let wrappers = yield get(this, 'store').query('wrapper', query);
    set(this, 'wrappers', wrappers);
  }),

  fetchWrapperAction: task(function*() {
    let group = get(this, 'group.id');
    let actions = yield get(this, 'store').query('action', {
      group,
      title: 'wrapper:updated',
      state: 'active'
    });
    set(this, 'actionList', actions);
  })
});
