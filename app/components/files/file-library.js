import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({
  selectedFile: null,
  actions: {
    selectFile(file) {
      set(this, 'selectedFile', file);
    }
  }
});
