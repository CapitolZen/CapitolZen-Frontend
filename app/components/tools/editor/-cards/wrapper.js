import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  wrapperId: computed('payload.{wrapper-id,wrapperId}', function() {
    if (this.get('payload.wrapper-id')) {
      return this.get('payload.wrapper-id');
    } else {
      return this.get('payload.wrapperId');
    }
  }),
  pageId: computed('payload.{page-id,pageId}', function() {
    if (this.get('payload.page-id')) {
      return this.get('payload.page-id');
    } else {
      return this.get('payload.pageId');
    }
  }),
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
