import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default Component.extend({
  selectedWidget: 'update',
  widgets: A(['update', 'groups', 'intros', 'calendars']),
  selectedComponent: computed('selectedWidget', function() {
    return `dashboard/-widgets/${get(this, 'selectedWidget')}`;
  }),
  selectedWidgetInfo: computed('selectedWidget', function() {
    switch (get(this, 'selectedWidget')) {
      case 'update':
        return { title: 'Send Update', icon: 'paper-plane' };
      case 'groups':
        return {
          title: `${get(this, 'features.clientLabelPlural')}`,
          icon: 'address-book'
        };
      case 'intros':
        return { title: 'New Bills', icon: 'gavel' };
      case 'calendars':
        return { title: 'Committee Meetings', icon: 'calendar' };
    }
  })
});
