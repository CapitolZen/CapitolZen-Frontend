import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNameBindings: ['actualClassNames'],

  actualClassNames: computed('format', function() {
    let classes = 'notification-summary';
    let format = this.get('format');
    if (format) {
      classes += ' ' + format;
    }
    return classes;
  })
});
