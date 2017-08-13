import Ember from 'ember';
import { v4 } from 'ember-uuid';
import moment from 'moment';
const { computed, Component, get, set, isEmpty, inject: { service } } = Ember;
export default Component.extend({
  flashMessages: service(),
  store: service(),
  currentUser: service(),
  bill: computed.alias('wrapper.bill'),
  notes: computed.alias('wrapper.notes'),
  addNote: false,
  actions: {
    toggleAddNote() {
      this.toggleProperty('addNote');
    },
    saveNote({ doc, docId = false }) {
      if (!docId) {
        docId = v4();
      }

      let wrapper = get(this, 'wrapper');
      let notes = wrapper.get('notes');
      let user = get(this, 'currentUser.user');
      let time = moment().format('X');

      notes[docId] = { doc: doc, user: user, timestamp: time, public: false };
      wrapper.set('notes', notes);
      wrapper.save().then(() => {
        get(this, 'flashMessages').success('Note Saved!');
        set(this, 'addNote', false);
      });
    }
  }
});
