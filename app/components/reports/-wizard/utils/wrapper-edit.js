// Everything that touches notes needs to be rewritten

import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentUser: service(),
  model: alias('wrapper'),
  positions: A(['none', 'neutral', 'support', 'oppose']),
  formData: computed('model', function() {
    let position = get(this, 'model.position'),
      summary = get(this, 'model.displaySummary'),
      note = {};

    return { position, summary, note };
  }),

  actions: {
    submit({ position, summary, note }) {
      if (!note.user) {
        note.user = get(this, 'currentUser.user');
      }
      let wrapper = get(this, 'model');
      wrapper.set('position', position);
      wrapper.set('summary', summary);

      if (!note.doc) {
        wrapper.save();
      } else {
        //this totally uses side effects to save the note and shouldn't be done this way
        wrapper.saveNote(note);
      }
    }
  }
});
