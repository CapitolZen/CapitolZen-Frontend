import Component from '@ember/component';
import { get, set } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  position: alias('value.position'),
  actions: {
    save(value) {
      let output = {};
      output.position = value;
      set(this, 'value', output);
      this.notifyPropertyChange('value');
      get(this, 'update')(output);
    }
  }
});
