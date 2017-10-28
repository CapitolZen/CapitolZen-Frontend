import { helper } from '@ember/component/helper';

export function length(params /*, hash*/) {
  return params.length;
}

export default helper(length);
