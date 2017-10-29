import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

/**
 * Base component to handle simple forms.
 *
 * Assumptions:
 * Is using bootstrap forms
 * Is using changeset and primary changeset is stored at changeset.
 * Child class defines the following methods:
 *   initModel() {},
 *   onSubmitSuccess() {},
 *   onServerError() {},
 *
 * changeset is at component.changeset
 * model is at component.model
 *
 */
export default Component.extend({
  flashMessages: service(),

  changeset: null,
  model: null,

  /**
   * OVERRIDE THESE
   */
  initModel() {},
  onSubmitSuccess() {},
  onServerError() {},

  /**
   * Init.
   */
  init() {
    this._super(...arguments);

    // Let the child component setup the model and changeset properties.
    this.initModel();

    if (!get(this, 'changeset')) {
      console.log('Changeset not provided!');
    }

    if (!get(this, 'model')) {
      console.log('Model not provided!');
    }
  },

  /**
   * default: form is clean and hasn't been submitted
   * pending: form has been submitted and is waiting for a server response
   */
  formState: 'default',

  /**
   *
   */
  buttonState: computed('formState', function() {
    return this.get('formState');
  }),

  /**
   * Can be used to disable buttons to help prevent double click.
   */
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
    if ('payload' in data) {
      data = data['payload'];
    }

    if ('errors' in data) {
      if (Array.isArray(data['errors'])) {
        data['errors'].forEach(item => {
          this.get('flashMessages').danger(item['detail']);
        });
      }

      if ('non_field_errors' in data['errors']) {
        data['errors']['non_field_errors'].forEach(item => {
          this.get('flashMessages').danger(item);
        });
      }
    }
  },

  /**
   * We use concurrency to help prevent quick duplicate form submission.
   */
  submit: task(function*(changeset) {
    yield changeset
      .save()
      .then(data => {
        this.onSubmitSuccess(data);
      })
      .catch(data => {
        this.handleServerFormErrors(data);
        this.setFormState('default');
        this.onServerError(data);
      });
  }).drop(),

  actions: {
    /**
     * Primary submit handler. Calls the ember concurrency task.
     * @param changeset
     */
    submit(changeset) {
      // Only submit if something has actually changed.
      if (!changeset.get('isDirty')) {
        return false;
      }
      this.setFormState('pending');
      return this.get('submit').perform(changeset);
    }
  }
});
