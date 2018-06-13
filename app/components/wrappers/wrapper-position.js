import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  isEditing: false,
  canEdit: false,
  showDetails: true,
  positions: ['none', 'neutral', 'support', 'oppose'],
  position: alias('wrapper.position'),
  positionIcons: computed(function() {
    return {
      support: 'thumbs-up',
      oppose: 'thumbs-down',
      neutral: 'circle-o',
      none: 'minus'
    };
  }),
  positionClassMap: computed(function() {
    return {
      support: 'success',
      oppose: 'danger',
      neutral: 'warning',
      none: 'light'
    };
  }),
  positionModifier: computed('wrapper.position', function() {
    let position = get(this, 'wrapper.position');
    let classes = get(this, 'positionClassMap');
    return classes[position];
  }),
  positionIcon: computed('wrapper.position', function() {
    let position = get(this, 'wrapper.position');
    let iconMap = get(this, 'positionIcons');
    return iconMap[position];
  }),
  actions: {
    toggleEditing() {
      this.toggleProperty('isEditing');
    },
    save(position) {
      set(this, 'wrapper.position', position);
      get(this, 'wrapper')
        .save()
        .then(() => {
          get(this, 'flashMessages').success('Position Updated');
          set(this, 'isEditing', false);
        });
    }
  }
});
