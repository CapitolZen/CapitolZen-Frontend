import { helper } from '@ember/component/helper';
import createComponentAtom from 'ember-mobiledoc-editor/utils/create-component-atom';
export function mobiledocComponentAtoms() {
  return [
    createComponentAtom('tools/editor/-atoms/link'),
    createComponentAtom('tools/editor/-atoms/mention'),
    createComponentAtom('tools/editor/-atoms/wrapper')
  ];
}

export default helper(mobiledocComponentAtoms);
