import layout from '../../templates/global/app-breadcrumb';
import Ember from 'ember';

const {
  Component,
  inject: {
    service,
  },
} = Ember;

export default Component.extend({
  layout,
  uiGlobal: service('ui-global'),
});
