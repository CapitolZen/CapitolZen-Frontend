import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  ajax: service(),

  input: '',

  bills: [],

  /**
   * Submit data
   */
  submit: task(function*(data) {
    let results = yield this.get('ajax').post('bills/parse_text/', {
      data: {
        input: data
      }
    });

    this.set('bills', results.data.bills);
  }).drop(),

  actions: {
    getBills(data) {
      if (data) {
        return this.get('submit').perform(data);
      } else {
        this.set('bills', []);
      }
    }
  }
});
