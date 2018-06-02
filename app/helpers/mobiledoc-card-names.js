import { helper } from '@ember/component/helper';
import { CARDS } from '../utils/doc-factory';

export function mobiledocCardNames() {
  return CARDS;
}

export default helper(mobiledocCardNames);
