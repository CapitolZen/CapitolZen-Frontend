import { helper } from '@ember/component/helper';

export function chamberName(params /*, hash*/) {
  if (params[0] === 'upper') {
    return 'Senate';
  }

  if (params[0] === 'lower') {
    return 'House';
  }

  return params[0];
}

export default helper(chamberName);
