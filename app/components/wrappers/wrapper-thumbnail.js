import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { assert } from '@ember/debug';

const WrapperThumbnail = Component.extend({
  wrapper: null,
  didRecieveAttrs() {
    this._super(...arguments);
    assert('Please provide a valid Wrapper model', this.get('wrapper'));
  },
  displayTitle: alias('wrapper.bill.stateId'),
  position: alias('wrapper.position'),
  sponsor: alias('wrapper.sponsorDisplay')
});

WrapperThumbnail.reopenClass({
  positionalParams: ['wrapper']
});

export default WrapperThumbnail;
