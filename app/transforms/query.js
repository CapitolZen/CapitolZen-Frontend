import DS from 'ember-data';
import Ember from 'ember';

const { typeOf } = Ember;

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
