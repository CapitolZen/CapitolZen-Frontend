import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['list-group-item', 'flex-column', 'align-items-start'],
  //classNameBindings: ['active'],
  active: false,

  actions: {
    toggleActive() {
      this.toggleProperty('active');
    }
  }
});
