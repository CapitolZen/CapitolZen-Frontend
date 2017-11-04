import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  date: alias('row.lastActionDate'),

  badgeClass: computed(function() {
    let warningArray = ['reported', 'reading-1', 'reading-2', 'reading-3'];

    let dangerArray = ['adopted', 'executive-receipt', 'passage'];

    let infoArray = ['committee-passage'];

    let successArray = ['executive-signature'];

    let status = get(this, 'remoteStatus');

    if (warningArray.includes(status)) {
      return 'badge-warning';
    }

    if (dangerArray.includes(status)) {
      return 'badge-danger';
    }

    if (successArray.includes(status)) {
      return 'badge-success';
    }

    if (infoArray.includes(status)) {
      return 'badge-info';
    }

    return 'badge-default';
  })
});
