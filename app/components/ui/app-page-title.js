import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  uiGlobal: service('ui-global'),
  classNames: ['page-header', 'mb-lg-3', 'mb-2', 'mt-2'],
  size: computed('uiGlobal.wrapperSize', function() {
    return this.get('uiGlobal.wrapperSize');
  })
});
