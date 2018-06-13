import { assert } from '@ember/debug';
import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  request: service(),
  tagName: 'button',
  size: false,
  report: null,
  type: 'primary',
  classNames: ['btn'],
  classNameBindings: ['size', 'classType'],
  classType: computed('type', function() {
    return `btn-${get(this, 'type')}`;
  }),
  send: task(function*() {
    assert('Must provide a report model', get(this, 'report'));
    let reportId = get(this, 'report.id');
    yield this.get('ajax').request(`reports/${reportId}/send_report/`);

    get(this, 'flashMessages').success(
      'Report emailed to you. Check your inbox shortly!'
    );
  }),
  click() {
    get(this, 'send').perform();
  }
});
