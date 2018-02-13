import { inject as service } from '@ember/service';
import { computed, set, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { assert } from '@ember/debug';
import { task, hash } from 'ember-concurrency';
import { A, isArray } from '@ember/array';
import { all } from 'rsvp';
import moment from 'moment';

export default Component.extend({
  store: service(),
  media: service(),
  features: service(),
  currentUser: service(),
  flashMessages: service(),
  classNameBindings: ['fullWidth:w-100'],

  /**
   * Data
   */
  clients: [],
  bills: [],

  // I really have no idea what i'm doing. Without this,
  // Ember throws a "you modified bills twice on a single render...
  internalBills: [],
  savedCount: 0,
  savedWrappers: [],

  /**
   * Button Styling Props
   */
  fullWidth: true,
  buttonSize: false,
  displayText: true,
  buttonType: 'outline-secondary',
  menuAlign: 'right',
  isMobile: alias('media.isMobile'),
  buttonText: alias('defaultButtonText'),
  defaultButtonText: computed(function() {
    return `Add To ${this.features.clientLabel}`;
  }),

  title: computed('internalBills', function() {
    let bills = this.get('internalBills');

    if (bills.length === 1) {
      return bills[0].get('stateId');
    } else if (bills.length < 4) {
      return bills.mapBy('stateId').join(', ');
    } else {
      return bills.length + ' bills';
    }
  }),

  /**
   * Component Hook
   */
  didReceiveAttrs() {
    this._super(...arguments);
    assert('`bills` required', get(this, 'bills'));

    // Make bills an array if not already.
    if (!Array.isArray(this.get('bills'))) {
      set(this, 'internalBills', [this.get('bills')]);
    } else {
      set(this, 'internalBills', this.get('bills'));
    }

    set(this, 'savedCount', 0);
    set(this, 'savedWrappers', []);
  },

  /**
   * Fetch Client List
   */
  fetchClients: task(function*() {
    // Filter out clients who've already selected these bills.
    let user = get(this, 'currentUser.user');
    let alreadySelectedBills = get(this, 'internalBills')
      .mapBy('id')
      .join(',');

    let clientModels = yield get(this, 'store').query('group', {
      without_bills: alreadySelectedBills,
      sort: 'title',
      active: true
    });

    let allClients = [],
      userClients = [];

    clientModels.forEach(client => {
      let data = {
        content: client,
        selected: false,
        wrappers: []
      };

      if (client.get('assigned_to').includes(user)) {
        userClients.push(data);
      } else {
        allClients.push(data);
      }
    });

    set(this, 'allClients', allClients);
    set(this, 'userClients', userClients);
  }),

  /**
   * Add the bills to a specific client.
   * @row = {'content': <client>, selected: false|true}
   */
  addBillsToClient: task(function*(row) {
    let user = get(this, 'currentUser.user');

    let operation = 'add';

    if (row.wrappers.length) {
      operation = 'remove';
    }

    if (operation === 'add') {
      let bills = get(this, 'internalBills');
      let promises = bills.map(bill => {
        return get(this, 'store')
          .createRecord('wrapper', {
            bill: bill,
            group: row.content,
            metadata: {
              savedby: user.get('name'),
              saveddate: moment().unix()
            }
          })
          .save();
      });
      all(promises)
        .then(wrappers => {
          set(row, 'wrappers', wrappers);
          set(row, 'selected', true);

          this.incrementProperty('savedCount');
          get(this, 'currentUser').event('wrapper:saved');
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      let promises = row.wrappers.map(wrapper => {
        wrapper.destroyRecord();
      });

      all(promises).then(wrappers => {
        set(row, 'wrappers', []);
      });
      set(row, 'selected', false);
    }
  }),

  //Noop for passing contextual action
  billAdded() {},

  actions: {
    /**
     *
     */
    toggleActive() {
      get(this, 'fetchClients').perform();
    },

    /**
     *
     */
    openModal() {
      set(this, 'openModal', true);
      get(this, 'fetchClients').perform();
    },

    /**
     *
     */
    closeModal() {
      get(this, 'clients').forEach(g => {
        set(g, 'isSelected', null);
      });
      set(this, 'clients', null);
      set(this, 'openModal', false);
      let props = this.getProperties('savedWrappers', 'savedCount');
      get(this, 'billAdded')(props);
      if (get(this, 'savedCount')) {
        get(this, 'flashMessages').success(
          `${get(this, 'savedCount')} Bills Saved!`
        );
      }
    }
  }
});
