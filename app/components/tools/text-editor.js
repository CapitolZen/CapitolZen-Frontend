import { set, get, computed } from '@ember/object';
import Component from '@ember/component';
import { EKMixin, keyUp, keyDown, keyPress } from 'ember-keyboard';
import { on } from '@ember/object/evented';
import { run } from '@ember/runloop';
import createComponentCard from 'ember-mobiledoc-editor/utils/create-component-card';

import $ from 'jquery';

export default Component.extend(EKMixin, {
  classNameBindings: ['disabled'],
  showEditor: true,
  autoSave: false,

  cards: computed(function() {
    return [createComponentCard('editor-test-hr')];
  }),

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
    if (!get(this, 'autoSave')) {
      run(() => {
        $('.mobiledoc-editor__editor').empty();
      });
    }
  },
  cancel() {
    get(this, 'cancelAction')();
  },
  delete() {
    let args = { docId: get(this, 'docId') };
    get(this, 'deleteAction')(args);
    this.destroy();
  },
  actions: {
    mobileDocUpdated(doc) {
      set(this, 'doc', doc);
      if (get(this, 'autoSave')) {
        this.save();
      }
    },
    saveDocument() {
      this.save();
    },
    cancelDocument() {
      this.cancel();
    },
    deleteDocument() {
      this.delete();
    }
  }
});
