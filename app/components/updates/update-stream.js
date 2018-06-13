import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { A } from '@ember/array';

export default Component.extend({
  store: service(),
  group: null,
  page: null,
  stream: null,
  isAdmin: false,
  externalAddedUpdates: false,
  linkUrl: computed(function() {
    return this.isAdmin ? 'page-admin.update' : 'page.update';
  }),
  didReceiveAttrs() {
    this._super(...arguments);
    assert(
      'Must provide valid group or (but not and) page',
      (this.group || this.page) && !(this.group && this.page)
    );
    this.set('stream', A());

    this.get('loadStream').perform();
  },

  instance: computed('group.id', 'page.id', function() {
    if (this.group) {
      return this.group;
    } else {
      return this.page;
    }
  }),

  model: computed('group.id', 'page.id', 'instance', function() {
    let model = this.get('instance').get('_internalModel.modelName');
    if (model === 'page') {
      model = 'group_page';
    }
    return model;
  }),

  isGroup: equal('model', 'group'),
  loadStream: task(function*() {
    let instance = this.get('instance'),
      model = this.get('model');
    let params = {
      sort: '-created'
    };
    params[model] = instance.get('id');
    let updates = yield this.get('store').query('update', params);
    this.get('stream').addObjects(updates);
    if (this.externalAddedUpdates) {
      this.get('stream').addObjects([this.externalAddedUpdates]);
    }
  })
});
