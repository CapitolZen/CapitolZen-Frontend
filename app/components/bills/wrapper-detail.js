import Ember from 'ember';

const {computed, get} = Ember;
export default Ember.Component.extend({
  classNames: ['list-group-item', 'flex-column', 'align-items-start'],
  //classNameBindings: ['active'],
  active: false,
  groupPosition: computed('group', 'wrapper', function() {
    let groupId = get(this, 'group').get('id')
    return get(this, 'wrapper').get('groups')[groupId].position;
  }),
  actions: {
    toggleActive() {
      this.toggleProperty('active');
    }
  }
});
