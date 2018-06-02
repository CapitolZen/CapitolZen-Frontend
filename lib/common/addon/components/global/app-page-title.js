import Component from '@ember/component';
import { inject as service } from '@ember/service';
import layout from '../../templates/components/global/app-page-title';

export default Component.extend({
  layout,
  uiGlobal: service('ui-global'),
  classNames: ['page-header', 'mb-lg-3', 'mb-2']
});
