import Ember from 'ember';

import QBuilder from '../../../mixins/q-builder';
const { A, get, set, Component, computed, inject: { service } } = Ember;
export default Component.extend(QBuilder, {
  store: service(),
  // Noop to get overridden
  updateQuery() {},
  availableRelationships: [],
  model: computed('modelName', function() {
    return get(this, 'store').modelFor(get(this, 'modelName'));
  }),

  modelProps: computed('model', function() {
    let props = A();
    get(this, 'model').eachAttribute((name, meta) => {
      props.pushObject({ name, type: meta.type });
    });

    return props;
  }),
  relationshipProps: computed('model', 'availableRelationships', function() {
    let m = get(this, 'model');
    let { belongsTo } = get(m, 'relationshipNames');
    let models = [];

    if (!get(this, 'availableRelationships').length) {
      models = belongsTo;
    } else {
      let defined = get(this, 'availableRelationships');
      defined.forEach(d => {
        if (belongsTo.contains(d)) {
          models.push(d);
        }
      });
    }
    let output = [];
    models.forEach(m => {
      let model = get(this, 'store').modelFor(m);
      let data = {
        model: m,
        props: []
      };
      model.eachAttribute((name, meta) => {
        data.props.push({ name, type: meta.type });
      });
      output.push(data);
    });
    return output;
  }),
  properties: computed('relationshipProps', 'modelProps', function() {
    return {
      model: get(this, 'modelProps'),
      relationship: get(this, 'relationshipProps')
    };
  }),
  actions: {
    filterDelete(prop) {
      get(this, 'removeQuery')(prop);
      let q = get(this, 'query');
      get(this, 'updateQuery')(q);
    },
    filterAdd(prop, op, value) {
      get(this, 'addQuery')(prop, op, value);
      let q = get(this, 'query');
      get(this, 'updateQuery')(q);
    }
  }
});
