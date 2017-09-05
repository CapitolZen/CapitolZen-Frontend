import Ember from 'ember';
const { Component, computed, get, set, inject: { service } } = Ember;
export default Component.extend({
  flashMessages: service(),
  isEditing: false,
  canEdit: false,
  showDetails: true,
  positions: ['support', 'oppose', 'neutral'],
  position: computed.alias('wrapper.position'),
  positionIcons: {
    support: 'thumbs-up',
    oppose: 'thumbs-down',
    neutral: 'circle-o'
  },
  positionClassMap: {
    support: 'success',
    oppose: 'danger',
    neutral: 'default'
  },
  positionModifier: computed('wrapper.position', function() {
    let position = get(this, 'wrapper.position');
    let classes = get(this, 'positionClassMap');
    return classes[position];
  }),
  positionIcon: computed('wrapper.position', function(val) {
    let position = get(this, 'wrapper.position');
    let iconMap = get(this, 'positionIcons');
    return iconMap[position];
  }),
  actions: {
    toggleEditing() {
      this.toggleProperty('isEditing');
    },
    save() {
      get(this, 'wrapper')
        .save()
        .then(() => {
          get(this, 'flashMessages').success('Position Updated');
          set(this, 'isEditing', false);
        });
    }
  }
});
