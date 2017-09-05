import { assert } from '@ember/debug';
import { set, get } from '@ember/object';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  query: null,

  // Query options
  operators: {
    lt: 'lt',
    gt: 'gt',
    gte: 'gte',
    lte: 'lte',
    exact: 'iexact',
    contains: 'icontains',
    starts: 'istartswith',
    ends: 'iendswith',
    eq: ''
  },

  operatorLabels: {
    lt: 'Less than',
    gt: 'Greater than',
    lte: 'Less than or equal to',
    gte: 'Greater than or equal to',
    exact: 'Exactly Matches',
    contains: 'Contains',
    starts: 'Starts with',
    ends: 'Ends with',
    eq: 'Equals'
  },

  init() {
    this._super(...arguments);
    set(this, 'query', {});
  },

  getOperatorOptions(type) {
    let operators = get(this, 'operators'),
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
  },

  addQuery(prop, op, value) {
    let operators = get(this, 'operators');
    assert('must provide valid operator', operators.hasOwnProperty(op));
    let key = `${prop}__${operators[op]}`;
    let nested = `query.${key}`;
    set(this, nested, value);
  },

  removeQuery(prop) {
    let q = get(this, 'query');
    delete q[prop];
    set(this, 'query', q);
  }
});
