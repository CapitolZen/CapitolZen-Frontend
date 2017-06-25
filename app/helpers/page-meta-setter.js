import Ember from 'ember';

export function pageMetaSetter(params/*, hash*/) {
  return params;
}

export default Ember.Helper.helper(pageMetaSetter);
