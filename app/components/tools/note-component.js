import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentUser: service(),
  isEditing: false,
  classNames: ['note-component'],
  classNameBindings: ['isEditing:note-editing'],
  canEditNote: computed('note', function() {
    let user_id = get(this, 'currentUser.user_id'),
      note = get(this, 'note');
    return note.userid === user_id;
  }),
  actions: {
    saveNote(data) {
      set(this, 'isEditing', false);
      get(this, 'save')(data);
    },
    toggleAddNote() {
      this.toggleProperty('isEditing');
    },
    editNote() {
      set(this, 'isEditing', true);
    },
    deleteNote(data) {
      set(this, 'isEditing', false);
      get(this, 'delete')(data);
    }
  }
});
