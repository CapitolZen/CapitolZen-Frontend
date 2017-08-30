import Ember from 'ember';
import QBuilder from '../../../mixins/q-builder';

const { get, set, computed, Component } = Ember;
export default Component.extend(QBuilder, {
  isEditing: true,
  isRelationship: false,
  selectedFilterProp: false,
  outputQuery: computed(
    'selectedFilterProp',
    'selectedOperator',
    'selectedValue',
    function() {
      let selectedFilterProp = get(this, 'selectedFilterProp'),
        selectedOperator = get(this, 'selectedOperator'),
        selectedValue = get(this, 'selectedValue');

      let query = `${selectedFilterProp}_${selectedOperator}`;
      query = query.underscore();
      return { query, value: selectedValue };
    }
  ),
  modelOptions: computed.alias('properties.model'),
  relationships: computed.alias('properties.relationship'),
  modelProps: computed('properties', function() {
    let p = get(this, 'properties');
    return p.model.map(m => {
      return m.name;
    });
  }),
  relationshipProps: computed.alias('selectedRelationship.props'),
  filterType: computed('selectedFilterProp', function() {
    let opts = get(this, 'modelOptions');
    return opts.findBy('name', get(this, 'selectedFilterProp'));
  }),
  availableOperators: computed('filterType', function() {
    let operators = get(this, 'operators'),
      valueType = get(this, 'filterType'),
      labels = get(this, 'operatorLabels');
    let allowed = [];
    switch (valueType.type) {
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

    let keys = Object.keys(operators);
    let output = [];
    allowed.forEach(a => {
      output.push({ label: labels[a], value: operators[a] });
    });
    return output;
  }),
  valueTool: computed('filterType', function() {}),
  actions: {
    setRelationshipFilter(select) {
      console.log(select);
      let relationship = get(this, 'selectedRelationship');
      set(this, 'selectedRelModelProp', select);
      set(this, 'selectedFilterProp', `${relationship.model}_${select.name}`);
    }
  }
});
