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
  savedCount: 0,
  savedWrappers: [],
  buttonText: 'Add to Client',
  buttonType: 'outline-secondary',
  menuAlign: 'right',

  didReceiveAttrs() {
    this._super(...arguments);
    assert(
      '`bill` or `billList` is required ',
      get(this, 'bill') || get(this, 'billList')
    );
    set(this, 'savedCount', 0);
    set(this, 'savedWrappers', []);
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
      sort: 'title',
      active: true
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
        let merged = get(this, 'savedWrappers');
        merged = merged.concat(savedWrapper);
        set(this, 'savedWrappers', merged);
        this.incrementProperty('savedCount');
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
