import Ember from 'ember';
const { A, Route, RSVP } = Ember;
export default Route.extend({
  model() {
    let { id } = this.paramsFor('groups.detail');
    return RSVP.hash({
      group: this.store.findRecord('group', id),
      wrappers: A()
    });
  }
});