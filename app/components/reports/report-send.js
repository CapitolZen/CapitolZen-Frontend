import Ember from 'ember';
import { task } from 'ember-concurrency';

const { assert, computed, Component, get, inject: { service } } = Ember;
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
    let response = yield get(this, 'request').request(
      `reports/${reportId}/send_report/`
    );

    get(this, 'flashMessages').success(
      'Report emailed to you. Check your inbox shortly!'
    );
  }),
  click() {
    get(this, 'send').perform();
  }
});
