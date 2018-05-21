import { helper } from '@ember/component/helper';
import createComponentCard from 'ember-mobiledoc-editor/utils/create-component-card';
import { CARDS } from '../utils/doc-factory';

export function mobiledocComponentCards() {
  return CARDS.map(c => {
    return createComponentCard(c);
  });
}

export default helper(mobiledocComponentCards);
