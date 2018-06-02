import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { assert } from '@ember/debug';
import { or } from '@ember/object/computed';
import { A } from '@ember/array';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  currentUser: service(),
  groupId: null,
  group: null,
  report: null,
  reportLink: null,
  options: {},
  visibilityOptions: A(['organization', 'anyone', 'contacts']),
  displayTypes: A(['list', 'slideshow', 'table']),

  reportFormId: computed('report', function() {
    return `report-form-${get(this, 'report.id')}`;
  }),

  setupData: task(function*() {
    yield get(this, 'setupReport').perform();
    //yield get(this, 'setupReportLink').perform();
  }).on('didReceiveAttrs'),

  setupReport: task(function*() {
    if (get(this, 'report')) {
      return yield true;
    }

    let group = get(this, 'group');
    assert(
      'must provide a `groupId` or `group` model',
      get(this, 'groupId') || group
    );
    if (!group) {
      group = yield get(this, 'store').findRecord(
        'group',
        get(this, 'groupId')
      );
    }
    let report = yield get(this, 'store').createRecord('report', {
      group,
      title: `Report For ${group.get('title')}`,
      organization: get(this, 'currentUser.organization'),
      user: get(this, 'currentUser.user')
    });

    if (get(this, 'options.displayType')) {
      report.set('displayType', get(this, 'options.displayType'));
    }

    set(this, 'report', report);
  }),

  setupReportLink: task(function*() {
    if (get(this, 'reportLink')) {
      return yield true;
    }

    let report = get(this, 'report');
    let reportLink = null;
    if (report.get('isNew')) {
      reportLink = yield get(this, 'store').createRecord('reportLink', {
        report,
        organization: get(this, 'currentUser.organization'),
        group: get(this, 'group')
      });
    } else {
      reportLink = yield get(this, 'store').query('reportLink', {
        report: report.get('id')
      });
    }

    set(this, 'reportLink', reportLink);
  }),
  saveRecords: task(function*() {
    let report = get(this, 'report');

    yield report.save();
  }),
  actions: {
    submitReport() {
      // TODO add validations and dynamically submit this
      let report = get(this, 'report');
      report.save().catch(err => {
        alert(err);
      });
    },
    submitReportLink() {
      let report = get(this, 'report');
      report.save();
    }
  }
});
