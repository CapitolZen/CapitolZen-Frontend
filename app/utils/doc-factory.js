import EmberObject from '@ember/object';
import { MOBILEDOC_VERSION } from 'mobiledoc-kit/renderers/mobiledoc';
import { alias } from '@ember/object/computed';

const EMPTY_MOBILEDOC = {
  version: MOBILEDOC_VERSION,
  markups: [],
  atoms: [],
  cards: [],
  sections: []
};

const DocFactory = EmberObject.extend({
  _doc: null,
  init() {
    this._super(...arguments);
    this.set('doc', EMPTY_MOBILEDOC);
  },
  mobileDoc: alias('_doc')
});

export default DocFactory;
