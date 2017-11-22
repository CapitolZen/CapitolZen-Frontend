import Control from 'ember-bootstrap/components/bs-form/element/control';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Control.extend({
  currentUser: service(),
  classNames: ['form-check'],
  isSelected: computed('value', {
    get() {
      return !get(this, 'value').indexOf(get(this, 'currentUser.user_id'));
    },
    set(key, value) {
      let userId = get(this, 'currentUser.user_id');
      let userList = get(this, 'value');
      if (value) {
        userList.push(userId);
      } else {
        let index = userList.indexOf(userId);
        userList.splice(index, 1);
      }

      set(this, 'value', userList);
      return !get(this, 'value').indexOf(get(this, 'currentUser.user_id'));
    }
  }),

  actions: {
    change(e) {
      let userList = A(get(this, 'value')),
        userId = get(this, 'currentUser.user_id');
      if (e.target.checked) {
        userList.pushObject(userId);
      } else {
        let index = userList.indexOf(userId);
        userList.splice(index, 1);
      }
      get(this, 'onChange')(userList.toArray());
    }
  }
});
