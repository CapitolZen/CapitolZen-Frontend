import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { A } from '@ember/array';
import { task } from 'ember-concurrency';
import { all } from 'rsvp';
import moment from 'moment';
import $ from 'jquery';

export default Component.extend({
  internalModel: A(),
  defaultDate: moment(),
  viewName: 'agendaWeek',
  hideModal: false,
  fistModel: task(function*() {
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
        description: get(event, 'description')
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
    eventClick({ id }, jsView, view) {},
    setAsToday() {
      set(this, 'defaultDate', moment());
    },
    next() {
      $('.full-calendar').fullCalendar('next');
    },
    prev() {
      $('.full-calendar').fullCalendar('prev');
    }
  }
});
