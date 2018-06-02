import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

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
  groupId: alias('payload.editorContext.group-id'),
  pageId: computed('payload.editorContext', function() {
    if (this.get('payload.editorContext.page-id')) {
      return this.get('payload.editorContext.page-id');
    } else {
      return this.get('payload.editorContext.pageId');
    }
  }),
  didReceiveAttrs() {
    this._super(...arguments);
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
      let props = {};
      props['wrapper-id'] = this.get('wrapper.id');
      props['page-id'] = this.pageId;
      this.saveCard(props);
      this.cancelCard();
      props.cardName = 'wrapper';
      this.sendAction('didSaveCard', props); // eslint-disable-line
    }
  }
});
