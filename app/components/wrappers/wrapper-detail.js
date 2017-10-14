import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import { v4 } from 'ember-uuid';
import moment from 'moment';
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
    saveNote({ doc, docId }) {
      if (!docId) {
        docId = v4();
      }

      let wrapper = get(this, 'wrapper');
      let notes = wrapper.get('notes');
      let user = get(this, 'currentUser.user');
      let time = moment();

      notes[docId] = { doc: doc, user: user, timestamp: time, public: false };
      wrapper.set('notes', notes);
      wrapper.save().then(() => {
        get(this, 'flashMessages').success('Note Saved!');
        set(this, 'addNote', false);
      });
    }
  }
});
