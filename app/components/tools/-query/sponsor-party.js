import Component from '@ember/component';
import { computed, get, set } from '@ember/object';

export default Component.extend({
  sponsorParties: computed('value', function() {
    return get(this, 'value.bill__sponsor__party');
  }),
  hasAnySelected: computed(
    'demSelected',
    'gopSelected',
    'otherSelected',
    function() {
      return (
        get(this, 'demSelected') ||
        get(this, 'gopSelected') ||
        get(this, 'otherSelected')
      );
    }
  ),
  actions: {
    save(value) {
      let output = {};
      output.bill__sponsor__party = value;
      set(this, 'value', output);
      this.notifyPropertyChange('value');
      get(this, 'update')(output);
    }
  }
});
