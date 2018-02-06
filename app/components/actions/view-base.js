import Component from '@ember/component';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';
import { task } from 'ember-concurrency';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias, equal } from '@ember/object/computed';

export default Component.extend(RecognizerMixin, {
  store: service(),
  flashMessages: service(),
  actionModel: null,
  referencedModelType: null,
  referencedModelId: null,
  _didLoad: false,
  footerClasses: 'd-flex justify-content-center',
  referencedModelLinkTo: computed('referencedModelType', function() {
    return get(this, 'referencedModelType').toLowerCase();
  }),
  displayTitle: computed('actionModel.title', function() {
    let titleMap = {
      'bill:introduced': 'Bill Introduced',
      'wrapper:updated': 'Bill Updated',
      'wrapper:committee_scheduled': 'Hearing for Bill',
      'organization:user-add': 'User Joined',
      'organization:user-invite': 'User Invited',
      'user:mention': 'Mentioned',
      'committee:meeting': 'Committee Meeting'
    };
    return titleMap[get(this, 'actionModel.title')];
  }),

  //optional hook
  postLoadHook(model) {},
  // For contextual component
  didLoad() {},
  loadReferencedModel: task(function*() {
    let record = yield get(this, 'store').findRecord(
      get(this, 'referencedModelType'),
      get(this, 'referencedModelId')
    );
    this.postLoadHook(record);
    set(this, '_didLoad', true);
    this.didLoad(record);
    set(this, 'referencedModel', record);
  }).on('didReceiveAttrs'),
  actions: {
    dismiss() {
      get(this, 'dismiss')();
    }
  }
});
