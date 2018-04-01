import Component from '@ember/component';
import layout from '../../templates/components/koenig-card/bill';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import { isBlank } from '@ember/utils';
import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  layout,

  store: service(),

  /**
   * @private
   */
  findBill: task(function*(bill_id) {
    let results = yield this.get('store')
      .query('bill', {
        state_id: this.get(bill_id)
      })
      .then(data => {
        return data.get('firstObject');
      });

    this.set('bill', results);
  }).drop(),

  model: computed('bill', function() {
    if (!this.get('payload.bill')) {
      return null;
    }

    if (!this.get('bill')) {
      this.get('findBill').perform(this.get('payload.bill'));
    }

    return this.get('bill');
  }),

  // attrs
  payload: null,
  isSelected: false,
  isEditing: false,

  // closure actions
  saveCard() {},
  deleteCard() {},

  init() {
    this._super(...arguments);

    if (!this.get('payload.bill')) {
      this.set('payload.bill', '');
    }
  },

  actions: {
    updateBill(bill) {
      this._updatePayloadAttr('bill', bill);
    },

    leaveEditMode() {
      if (isBlank(this.get('payload.bill'))) {
        // afterRender is required to avoid double modification of `isSelected`
        // TODO: see if there's a way to avoid afterRender
        run.scheduleOnce('afterRender', this, function() {
          this.deleteCard();
        });
      }
    }
  },

  _updatePayloadAttr(attr, value) {
    let payload = this.get('payload');
    let save = this.get('saveCard');

    set(payload, attr, value);

    // update the mobiledoc and stay in edit mode
    save(payload, false);
  }
});
