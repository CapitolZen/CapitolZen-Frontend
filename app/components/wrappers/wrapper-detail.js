import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { set, get, getWithDefault } from '@ember/object';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  store: service(),
  currentUser: service(),
  bill: alias('wrapper.bill'),
  notes: alias('wrapper.notes'),
  isDraft: alias('wrapper.isDraft'),
  addNote: false,
  openBillConnector: false,

  searchBills: task(function*(terms) {
    yield timeout(600);
    return get(this, 'store').query('bill', { search: terms });
  }),
  actions: {
    toggleAddNote() {
      this.toggleProperty('addNote');
    },
    saveNote(note) {
      let wrapper = get(this, 'wrapper');
      if (!note.user) {
        note.user = get(this, 'currentUser.user');
      }

      wrapper.saveNote(note).then(() => {
        get(this, 'flashMessages').success('Note Saved!');
        get(this, 'currentUser').event('wrapper:comment');
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
    },
    attachBill() {
      let wrapper = get(this, 'wrapper'),
        bill = get(this, 'selectedBill');
      wrapper.set('bill', bill);
      wrapper.save(() => {
        get(this, 'flashMessage').success(`Draft is now ${bill.stateId}`);
      });
    },
    submit() {}
  }
});
