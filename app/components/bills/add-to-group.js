import { inject as service } from '@ember/service';
import { computed, set, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { assert } from '@ember/debug';
import { task, hash } from 'ember-concurrency';
import { A, isArray } from '@ember/array';
import { all } from 'rsvp';

export default Component.extend({
  store: service(),
  media: service(),
  currentUser: service(),
  flashMessages: service(),
  classNameBindings: ['fullWidth:w-100'],
  fullWidth: true,
  groupList: null,
  bill: null,
  billList: null,
  buttonSize: false,
  displayText: true,
  buttonText: 'Add to Client',
  buttonType: 'outline-secondary',
  menuAlign: 'right',

  didRecieveAttrs() {
    assert(
      '`bill` or `billList` is required ',
      get(this, 'bill') || get(this, 'billList')
    );
  },

  _AllBills: computed('bill', 'billList', function() {
    let bills = get(this, 'bill') || get(this, 'billList');

    if (!isArray(bills)) {
      bills = [bills];
    }

    return A(bills);
  }),
  isMobile: alias('media.isMobile'),
  listGroups: task(function*() {
    let billIds = get(this, '_AllBills').map(b => {
      return get(b, 'id');
    });

    let groups = yield get(this, 'store').query('group', {
      without_bills: billIds.join(','),
      sort: 'title'
    });

    set(this, 'groupList', groups);
  }),
  addBillToGroup: task(function*(group) {
    if (group.get('isSelected')) {
      return false;
    }
    set(group, 'isSelected', true);
    let bills = get(this, '_AllBills');
    let promises = bills.map(b => {
      let wrapper = get(this, 'store').createRecord('wrapper', {
        bill: b,
        group: group,
        organization: get(this, 'currentUser.organization')
      });

      return wrapper.save();
    });

    all(promises)
      .then(savedWrapper => {
        get(this, 'billAdded')({ group, wrapper: savedWrapper });
        get(this, 'currentUser').event('wrapper:saved');
      })
      .catch(e => {
        console.log(e);
      });
  }),

  //Noop for passing contextual action
  billAdded() {},
  actions: {
    toggleActive() {
      get(this, 'listGroups').perform();
    },
    openModal() {
      set(this, 'openModal', true);
      get(this, 'listGroups').perform();
    },
    closeModal() {
      get(this, 'groupList').forEach(g => {
        set(g, 'isSelected', null);
      });
      set(this, 'groupList', null);
      set(this, 'openModal', false);
      get(this, 'flashMessages').success('Bills saved!');
    }
  }
});
