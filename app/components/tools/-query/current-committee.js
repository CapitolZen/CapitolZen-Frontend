import Component from '@ember/component';
import { get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  committeeId: alias('value.bill__current_committee'),
  didReceiveAttrs() {
    if (!get(this, 'value')) {
      set(this, 'value', { committee: false });
    }
    if (get(this, 'committeeId')) {
      get(this, 'hydrateCommittee').perform();
    }
  },
  hydrateCommittee: task(function*() {
    let model = yield get(this, 'store').findRecord(
      'committee',
      get(this, 'committeeId')
    );
    set(this, 'selectedCommittee', model);
  }),
  fetchCommittees: task(function*() {
    let committees = yield get(this, 'store').findAll('committee');
    set(this, 'committees', committees);
  }).on('init'),
  actions: {
    save() {
      if (!get(this, 'selectedCommittee')) {
        get(this, 'flashMessages').warning(
          'You must select a committee, please try again.'
        );
        return false;
      }
      get(this, 'update')({
        bill__current_committee: get(this, 'selectedCommittee.id')
      });
    }
  }
});
