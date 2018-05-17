import { set, get, computed } from '@ember/object';
import Component from '@ember/component';
import { EKMixin, keyUp, keyDown, keyPress } from 'ember-keyboard';
import { on } from '@ember/object/evented';
import { run } from '@ember/runloop';
import { BLANK_DOC } from '../../utils/doc-factory';
import { assert } from '@ember/debug';

import $ from 'jquery';

export default Component.extend(EKMixin, {
  classNameBindings: ['disabled'],
  showEditor: true,
  autoSave: false,
  editor: false,
  content: null,

  init() {
    console.log(BLANK_DOC);
    this._super(...arguments);
    if (!this.content) {
      this.set('content', BLANK_DOC);
    }
  },

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
  insertParagraph(after = true) {
    if (!this.editor) {
      return;
    }

    let position = after ? 'tail' : 'head';

    let editor = this.editor;
    let section = editor.post.toRange()[position].section;

    // create a blank paragraph at the top of the editor unless it's already
    // a blank paragraph
    if (section.isListItem || !section.isBlank || section.text !== '') {
      editor.run(postEditor => {
        let { builder } = postEditor;
        let newPara = builder.createMarkupSection('p');

        postEditor.insertSectionBefore(
          section.parent.sections,
          newPara,
          section
        );
      });
    }
  },
  actions: {
    mobileDocUpdated(doc) {
      console.log(doc);
      set(this, 'doc', doc);
      if (get(this, 'autoSave')) {
        this.save();
      }
    },
    didCreateEditor(editor) {
      this.set('editor', editor);
    },
    addCard(cardName, payload) {
      assert('Please provide a valid card name', cardName);
      this.editor.insertCard(cardName, payload, true);
      this.insertParagraph();
    },
    saveDocument() {
      this.save();
    },
    cancelDocument() {
      this.cancel();
    },
    deleteDocument() {
      this.delete();
    },
    didInsertCard() {
      this.insertParagraph();
    },
    focusEditor(event) {
      if (
        event.target.tagName === 'ARTICLE' &&
        event.target.classList.contains('mobiledoc-editor__editor-wrapper')
      ) {
        let { post } = this.editor;
        let range = post.toRange();
        console.log('sup');
        console.log(range);
        this.editor.focus();
        event.preventDefault();
        this.editor.run(postEditor => {
          postEditor.setRange(range.tail.section.tailPosition());
        });
      }
    }
  }
});
