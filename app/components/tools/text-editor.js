import { set, get } from '@ember/object';
import Component from '@ember/component';
import { EKMixin, keyUp, keyDown, keyPress, getKeyCode } from 'ember-keyboard';
import { on } from '@ember/object/evented';
import $ from 'jquery';

export default Component.extend(EKMixin, {
  activateKeyboard: on('init', function() {
    set(this, 'keyboardActivated', true);
  }),

  saveKey: on(keyDown('Enter+cmd'), function(event) {
    event.preventDefault();
    this.save();
  }),
  escapeKey: on(keyDown('Escape'), function() {
    if (!get(this, 'isNew')) {
      this.cancel();
    }
  }),
  save() {
    let doc = get(this, 'doc');
    let args = { doc: doc };
    if (get(this, 'docId')) {
      args.docId = get(this, 'docId');
    }
    get(this, 'saveAction')(args);
  },
  cancel() {
    get(this, 'cancelAction')();
  },
  delete() {
    let doc = get(this, 'doc');
    let args = { doc: doc };
    set(this, 'content', false);
    get(this, 'deleteAction')(args);
  },
  actions: {
    mobileDocUpdated(doc) {
      set(this, 'doc', doc);
    },
    saveDocument() {
      this.save();
      if (get(this, 'isNew')) {
        set(this, 'content', false);
        set(this, 'hideEditor', true);
        set(this, 'hideEditor', false);
      }
    },
    cancelDocument() {
      this.cancel();
    },
    deleteDocument() {
      this.delete();
    }
  }
});
