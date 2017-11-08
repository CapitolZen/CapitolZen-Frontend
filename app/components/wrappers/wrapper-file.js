import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

const WrapperFile = Component.extend({
  store: service(),
  file: null,
  model: null,
  fetchModel: task(function*() {
    let model = yield get(this, 'store').findRecord('file', get(this, 'file'));
    set(this, 'model', model);
  }).on('didReceiveAttrs')
});

WrapperFile.reopenClass({
  positionalParams: ['file']
});

export default WrapperFile;
