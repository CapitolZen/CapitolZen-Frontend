import Component from '@ember/component';
import { alias, empty } from '@ember/object/computed';
import { get, set } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';

const Lab = Component.extend({
  classNames: ['mt-2'],
  store: service(),
  bill: null,
  summary: alias('bill.billTextAnalysis.content'),
  relatedIds: alias('bill.relatedBillIds'),
  hasRelated: empty('relatedIds'),
  fetchRelatedBills: task(function*() {
    let ids = get(this, 'relatedIds');
    let promises = ids.map(id => {
      return get(this, 'store').findRecord('bill', id);
    });

    let bills = yield all(promises);
    set(this, 'relatedBills', bills);
  }).on('init')
});

Lab.reopenClass({
  positionalParams: ['bill']
});

export default Lab;
