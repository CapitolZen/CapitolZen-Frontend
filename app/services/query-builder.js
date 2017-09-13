import Service from '@ember/service';
import { get } from '@ember/object';

export default Service.extend({
  // Query options
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

  getOperatorOptions(type) {
    let labels = get(this, 'operatorLabels'),
      operators = get(this, 'operators');
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

  /**
   * @static
   * @param query
   * @param op
   * @param val
   * @return {{}}
   */
  generateQuery(query, op, val) {
    let output = {};
    let key = `${query.qvalue}__${op.value}`.underscore();

    if (query.type === 'date') {
      val = val.toISOString();
    }
    output[key] = val;
    return output;
  },

  /**
   * @static
   * @param opts
   * @param type
   * @return {*}
   */
  valueElementGenerator(opts, type) {
    if (opts) {
      return {
        el: 'select',
        opts
      };
    }

    if (type === 'date') {
      return {
        el: 'calendar'
      };
    }

    if (type === 'boolean') {
      return {
        el: 'radio',
        opts: [true, false]
      };
    }

    return {
      el: 'text'
    };
  }
});
