import Ember from 'ember';
const { Component, set, get } = Ember;
export default Component.extend({
  isEditing: false,
  doubleClick() {
    set(this, 'isEditing', true);
  },
  actions: {
    saveNote(data) {
      set(this, 'isEditing', false);
      get(this, 'save')(data);
    },
    toggleAddNote() {
      this.toggleProperty('isEditing');
    }
  }
});
