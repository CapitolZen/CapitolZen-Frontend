import { set, get, getWithDefault, computed } from '@ember/object';
import DS from 'ember-data';
import { v4 } from 'ember-uuid';
import { assert } from '@ember/debug';
import moment from 'moment';
import { A } from '@ember/array';

export default DS.Model.extend({
  bill: DS.belongsTo('bill'),
  group: DS.belongsTo('group'),
  organization: DS.belongsTo('organization'),
  notes: DS.attr(),
  files: DS.attr(),
  position: DS.attr('string', { defaultValue: 'neutral' }),
  starred: DS.attr('boolean', { defaultValue: false }),
  summary: DS.attr('string'),
  positionDetail: DS.attr('string'),
  saveNote({ doc, docId, user, ispublic = false }) {
    if (!docId) {
      docId = v4();
    }

    assert('must provide a valid document', doc);
    assert('must provide a valid user', user);

    let notes = getWithDefault(this, 'notes', []);

    notes = A(notes);
    let timestamp = moment();
    let update = {
      doc,
      userid: user.get('id'),
      user,
      timestamp,
      id: docId,
      ispublic
    };

    let index = notes.findIndex(note => {
      return note.id === docId;
    });

    if (index < 0) {
      notes.addObject(update);
    } else {
      notes[index] = update;
    }
    set(this, 'notes', notes);
    return this.save();
  },
  deleteNote({ docId }) {
    let notes = get(this, 'notes');
    let index = notes.findIndex(el => {
      return el.id === docId;
    });

    notes.splice(index, 1);
    set(this, 'notes', notes);
    return this.save();
  }
});
