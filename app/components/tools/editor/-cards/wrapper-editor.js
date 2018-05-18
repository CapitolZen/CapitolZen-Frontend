import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default Component.extend({
  store: service(),
  classNames: [
    'card-editor',
    'bg-lighter',
    'p-3',
    'w-100',
    'm-auto',
    'rounded'
  ],
  wrapper: null,
  groupId: alias('payload.editorContext.groupId'),
  pageId: alias('payload.editorContext.pageId'),
  didReceiveAttrs() {
    this._super(...arguments);
    console.log(this.payload);
    if (this.get('payload')) {
      this.set('wrapperId', this.get('payload.wrapperId'));
    }
  },
  loadWrapper: task(function*() {}),
  searchWrappers: task(function*(term) {
    yield timeout(400);
    return this.get('store').query('wrapper', {
      search: term,
      group: this.groupId
    });
  }),
  actions: {
    save() {
      let props = { wrapperId: this.get('wrapper.id'), pageId: this.pageId };
      this.saveCard(props);
      this.cancelCard();
    }
  }
});
