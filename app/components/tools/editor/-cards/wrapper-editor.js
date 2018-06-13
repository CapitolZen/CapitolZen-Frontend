import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
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
  groupId: computed('payload.editorContext.{group-id,groupId}', function() {
    if (this.get('payload.editorContext.group-id')) {
      return this.get('payload.editorContext.group-id');
    } else {
      return this.get('payload.editorContext.groupId');
    }
  }),
  //Don't judge. I don't know what's going on.
  pageId: computed('payload.editorContext.{page-id,pageId}', function() {
    if (this.get('payload.editorContext.page-id')) {
      return this.get('payload.editorContext.page-id');
    }
    if (this.get('payload.editorContext.pageId')) {
      return this.get('payload.editorContext.pageId');
    }

    if (this.get('payload.pageId')) {
      return this.get('payload.pageId');
    }

    if (this.get('payload.page-id')) {
      return this.get('payload.page-id');
    }

    return false;
  }),
  didReceiveAttrs() {
    this._super(...arguments);
    if (this.get('payload')) {
      this.set('wrapperId', this.get('payload.wrapperId'));
      this.set('_pageId', this.get('payload.editorContext.pageId'));
    }
  },
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
      props['page-id'] = this.get('pageId');
      props['editorContext'] = this.get('payload.editorContext');
      this.saveCard(props);
      this.cancelCard();
      props.cardName = 'wrapper';
      this.sendAction('didSaveCard', props); // eslint-disable-line
    }
  }
});
