import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
export default Component.extend({
  isEditing: false,
  displaySummary: computed('summary', function() {
    return get(this, 'summary') ? get(this, 'summary') : '';
  }),
  summary: computed('wrapper.summary', function() {
    let wrapper = get(this, 'wrapper');
    let summary = wrapper.get('summary');
    return summary ? summary : false;
  }),
  actions: {
    toggleEditing() {
      this.toggleProperty('isEditing');
    },
    saveSummary(summary) {
      let wrapper = get(this, 'wrapper');
      set(wrapper, 'summary', summary);
      wrapper.save().then(() => {
        set(this, 'isEditing', false);
      });
    }
  }
});
