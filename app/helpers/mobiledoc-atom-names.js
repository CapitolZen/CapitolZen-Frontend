import { helper } from '@ember/component/helper';

export function mobiledocAtomNames() {
  return [
    'tools/editor/-atoms/link',
    'tools/editor/-atoms/mention',
    'tools/editor/-atoms/wrapper'
  ];
}

export default helper(mobiledocAtomNames);
