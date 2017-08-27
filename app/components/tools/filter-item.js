import Ember from 'ember';
import QBuilder from '../../mixins/q-builder';

const { A, get, set, computed, Component, inject: { service } } = Ember;

export default Component.extend(QBuilder, {
  classNames: ['row'],
  operatorOptions: computed('selectedQuery', function() {
    if (get(this, 'selectedQuery')) {
      let { type } = get(this, 'selectedQuery'),
        operators = get(this, 'operators'),
        labels = get(this, 'operatorLabels');

      let allowed = [];
      switch (type) {
        case 'string':
          allowed = ['exact', 'contains', 'starts', 'ends'];
          break;
        case 'boolean':
          allowed = ['eq'];
          break;
        case 'date':
        case 'number':
          allowed = ['eq', 'gt', 'gte', 'lt', 'lte'];
          break;
      }
      let output = [];
      allowed.forEach(a => {
        output.push({ label: labels[a], value: operators[a] });
      });

      return output;
    }
    return [];
  })
});
