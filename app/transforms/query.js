import { typeOf } from '@ember/utils';
import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    if (typeOf(serialized) === 'string') {
      serialized = JSON.parse(serialized);
    }
    let keys = Object.keys(serialized);
    let output = {};

    keys.forEach(k => {
      let s = k.replace(/-/g, '_');
      output[s] = serialized[k];
    });

    return output;
  },

  serialize(deserialized) {
    return JSON.stringify(deserialized);
  }
});
