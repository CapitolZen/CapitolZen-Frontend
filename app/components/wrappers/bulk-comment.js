import Component from '@ember/component';
import { get, getWithDefault, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { all } from 'rsvp';

export default Component.extend({
  classNames: ['w-100'],
  currentUser: service(),
  flashMessages: service(),
  didReceiveAttrs() {
    set(this, 'selectedWrappers', getWithDefault(this, 'wrapperList', A()));
  },
  actions: {
    modalClosed() {
      set(this, 'openModal', false);
    },
    saveNote(note) {
      let promises = get(this, 'selectedWrappers').map(wrapper => {
        note.user = get(this, 'currentUser.user');
        return wrapper.saveNote(note);
      });
      all(promises)
        .then(results => {
          get(this, 'flashMessages').success(
            `Notes added to ${results.length} bills`
          );
        })
        .catch(err => {
          console.error(err);
          get(this, 'flashMessages').danger(
            'There was a problem and our team has been notified.'
          );
        })
        .finally(() => {
          set(this, 'openModal', false);
        });
    },

    updateWrappers(selected) {
      get(this, 'selectedWrappers').pushObject(selected);
    }
  }
});
