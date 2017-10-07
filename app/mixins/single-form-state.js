import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

/**
 * Easily handle some of the more "why the fuck doesn't this just
 * work better?" situation when submitting forms.
 */
export default Mixin.create({
  flashMessages: service(),
  formState: 'default',

  buttonState: computed('formState', function() {
    return this.get('formState');
  }),

  formSubmitButtonDisabled: computed('formState', function() {
    if (this.get('formState') === 'pending') {
      return true;
    } else {
      return false;
    }
  }),

  /**
   * When a form is first submitted, disable the state and whatnot.
   * state should either be pending or default
   */
  setFormState(state) {
    this.set('formState', state);
  },

  /**
   * Handle server errors. We just jam them up in as flash messages
   * Can't figure out how to put them next to the actual fields.
   */
  handleServerFormErrors(data) {
    data = data['payload'];
    if ('errors' in data) {
      data['errors'].forEach(item => {
        console.log(item['detail']);
        this.get('flashMessages').danger(item['detail']);
      });
    }
  }
});
