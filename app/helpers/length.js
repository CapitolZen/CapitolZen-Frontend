import Ember from 'ember';

export function length(params /*, hash*/) {
  return params.length;
}

export default Ember.Helper.helper(length);
