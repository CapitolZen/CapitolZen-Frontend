import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { hash } from 'rsvp';

export default Component.extend({
  store: service(),
  pageId: alias('payload.page-id'),
  wrapperId: alias('payload.wrapper-id'),
  page: null,
  wrapper: null,
  init() {
    this._super(...arguments);
    this.get('setupData').perform();
  },
  setupData: task(function*() {
    let promises = {
      page: this.get('store').findRecord('page', this.get('pageId')),
      wrapper: this.get('store').findRecord('wrapper', this.get('wrapperId'))
    };

    let results = yield hash(promises);
    this.setProperties(results);
  })
});
