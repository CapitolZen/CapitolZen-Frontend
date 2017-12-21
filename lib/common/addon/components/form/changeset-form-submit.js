import Component from '@ember/component';
import layout from '../../templates/components/form/changeset-form-submit';

export default Component.extend({
  layout,
  tagName: '',

  /**
   * Bootstrap Button Type
   */
  type: 'primary',
  block: false,

  /**
   * Text shown when submit is running
   */
  loadingText: 'Loading...',

  /**
   * Prevents transitioning from loading back to the default text once completed.
   *
   * Useful for redirect after submit
   */
  loadingOnComplete: false,

  /**
   * Shown when the user can take an action with the form.
   */
  defaultIcon: null,
  defaultText: null
});
