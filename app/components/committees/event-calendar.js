import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { A } from '@ember/array';
import { task } from 'ember-concurrency';
import { all } from 'rsvp';
import moment from 'moment';
import $ from 'jquery';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  currentUser: service(),
  media: service(),
  internalModel: null,
  defaultDate: moment(),
  viewName: 'listMonth',
  hideModal: false,
  selectedEventId: null,
  selectedEventModel: computed('selectedEventId', function() {
    return get(this, 'store').peekRecord('event', get(this, 'selectedEventId'));
  }),
  init() {
    this._super(...arguments);
    set(this, 'internalModel', A());
  },
  mungeModels: task(function*() {
    let eventModels = get(this, 'events');
    let promises = eventModels.map(e => {
      return e.loadCommittee();
    });

    let results = yield all(promises);

    eventModels.forEach(event => {
      let pojo = {
        start: get(event, 'start'),
        end: get(event, 'end'),
        title: get(event, 'title'),
        id: get(event, 'id'),
        description: get(event, 'description'),
        color: get(event, 'chamber') === 'upper' ? '#6610f2' : '#007bff',
        textColor: 'white'
      };

      get(this, 'internalModel').pushObject(pojo);
    });
  }).on('init'),

  prevButtonType: computed(function() {
    return 'light';
  }),
  nextButtonType: computed(function() {
    return 'light';
  }),
  actions: {
    eventClick({ id }, jsView, view) {
      set(this, 'selectedEventId', id);
      set(this, 'showModal', true);
    },
    setAsToday() {
      $('.full-calendar').fullCalendar('gotoDate', moment());
    },
    next() {
      $('.full-calendar').fullCalendar('next');
    },
    prev() {
      $('.full-calendar').fullCalendar('prev');
    },
    close() {
      set(this, 'showModal', false);
      set(this, 'selectedEventId', null);
    },
    sendEvent() {
      get(this, 'currentUser').event('event:calendar');
    }
  }
});
