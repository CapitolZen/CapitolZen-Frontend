import EmberObject from '@ember/object';
import { MOBILEDOC_VERSION } from 'mobiledoc-kit/renderers/mobiledoc';
import { alias } from '@ember/object/computed';

export const BLANK_DOC = {
  version: MOBILEDOC_VERSION,
  markups: [],
  atoms: [],
  cards: [],
  sections: [[1, 'p', [[0, [], 0, '']]]]
};
const DocFactory = EmberObject.extend({
  _doc: null,
  init() {
    this._super(...arguments);
    this.set('doc', BLANK_DOC);
  },
  mobileDoc: alias('_doc')
});

export const CARDS = [
  //'tools/editor/-cards/image',
  'tools/editor/-cards/embedly',
  'tools/editor/-cards/wrapper'
];

export { DocFactory };
