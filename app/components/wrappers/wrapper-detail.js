import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { set, get, getWithDefault, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  store: service(),
  currentUser: service(),
  bill: alias('wrapper.bill'),
  notes: alias('wrapper.notes'),
  addNote: false,
  actions: {
    toggleAddNote() {
      this.toggleProperty('addNote');
    },
    saveNote(note) {
      let wrapper = get(this, 'wrapper');
      if (!note.user) {
        note.user = get(this, 'currentUser.user');
      }

      wrapper
        .saveNote(note)
        .then(() => {
          get(this, 'flashMessages').success('Note Saved!');
        })
        .catch(err => {
          console.error(err);
        });
    },
    deleteNote({ docId }) {
      let wrapper = get(this, 'wrapper');
      let notes = wrapper.get('notes');
      let index = notes.findIndex(el => {
        return el.id === docId;
      });

      notes.splice(index, 1);
      wrapper.set('notes', notes);
      wrapper.save().then(() => {
        get(this, 'flashMessages').success('Note Saved!');
      });
    },
    selectFile(file) {
      let wrapper = get(this, 'wrapper');
      let files = getWithDefault(wrapper, 'files', []);
      files.push(file.get('id'));
      wrapper.set('files', files);
      wrapper.save().then(() => {
        set(this, 'openModal', false);
        get(this, 'flashMessages').success('File Saved!');
      });
    }
  }
});
