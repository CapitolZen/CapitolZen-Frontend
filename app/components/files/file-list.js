import Component from '@ember/component';
import { get } from '@ember/object';
import { A } from '@ember/array';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  model: A(),
  ajax: service(),
  store: service(),
  recordQuery: {},
  fetchRecords: task(function*() {
    let query = get(this, 'recordQuery');
    let files = yield get(this, 'store').query('file', query);
    get(this, 'model').pushObjects(files.toArray());
  }).on('init'),

  actions: {
    selectFile(file) {
      get(this, 'select')(file);
    }
  }
});
