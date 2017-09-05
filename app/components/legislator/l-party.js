import Component from '@ember/component';
import { set, get, observer, computed } from '@ember/object';
export default Component.extend({
  tagName: 'span',
  classNames: ['badge'],
  classNameBindings: ['badgeModifier'],
  party: computed.alias('legislator.party'),
  badgeModifier: 'badge-default',
  badgeModifierObserver: observer('legislator.party', function() {
    let party = get(this, 'party');
    if (party) {
      party = party.toLowerCase();
    }

    let badge = '';
    switch (party) {
      case 'republican':
        badge = 'badge-republican';
        break;
      case 'democratic':
        badge = 'badge-democrat';
        break;
      case 'green':
        badge = 'badge-success';
        break;
      default:
        badge = 'badge-default';
    }

    set(this, 'badgeModifier', badge);
  })
});
