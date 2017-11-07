import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { A } from '@ember/array';
import { get, set, computed } from '@ember/object';
import { alias, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';

const Cosponsors = Component.extend({
  store: service(),
  _model: A(),
  bill: null,
  cosponsors: alias('_model.[]'),
  adjustedCount: computed('cosponsors', function() {
    return get(this, 'cosponsors').length - 1;
  }),
  getCosponsors: task(function*() {
    let bill = yield get(this, 'bill');
    let sponsors = bill.get('cosponsors');
    let promises = sponsors.map(s => {
      return get(this, 'store').findRecord('legislator', s);
    });

    let legislators = yield all(promises);
    get(this, '_model').pushObjects(legislators);
    console.log(get(this, '_model'));
  }).on('didReceiveAttrs')
});

Cosponsors.reopenClass({
  positionalParams: ['bill']
});

export default Cosponsors;
