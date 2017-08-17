import Ember from 'ember';
const { get, set, Component } = Ember;
export default Component.extend({
  actions: {
    mobileDocUpdated(doc) {
      set(this, 'doc', doc);
    },
    saveDocument() {
      let doc = get(this, 'doc');
      let args = { doc: doc };
      if (get(this, 'docId')) {
        args.docId = get(this, 'docId');
      }
      set(this, 'content', false);
      get(this, 'saveAction')(args);
    }
  }
});
