import Component from '@ember/component';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';
import { task } from 'ember-concurrency';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias, equal } from '@ember/object/computed';

export default Component.extend(RecognizerMixin, {
  store: service(),
  currentUser: service(),
  flashMessages: service(),

  classNameBindings: ['actualClassNames'],

  actualClassNames: computed('model', function() {
    let classes = 'action-summary';
    classes += ' ' + this.get('model.state');
    return classes;
  }),

  referencedModelType: alias('model.referencedModelName'),
  referencedModelId: alias('model.modelId'),
  referencedModelLinkTo: computed('referencedModelType', function() {
    return get(this, 'referencedModelType').toLowerCase();
  }),

  subComponent: computed('isBill', 'isCommittee', 'isWrapper', function() {
    if (get(this, 'isBill')) {
      return 'actions/bill-view';
    }

    if (get(this, 'isCommittee')) {
      return 'actions/event-view';
    }

    if (get(this, 'isWrapper')) {
      return 'actions/wrapper-view';
    }
  }),

  isBill: equal('referencedModelType', 'Bill'),
  isCommittee: equal('referencedModelType', 'Event'),
  isWrapper: equal('referencedModelType', 'Wrapper'),
  title: alias('model.displayTitle'),

  /**
   * Noop for actions
   */
  onDismiss() {},
  /**
   *
   * @private
   */
  _dismissAction() {
    get(this, 'model')
      .updateState('dismissed')
      .then(() => {
        get(this, 'currentUser').event('action:dismiss');
        this.onDismiss();
      })
      .catch(err => {
        console.error(err);
        get(this, 'flashMessages').danger(
          'An error occurred, and our team has been notified!'
        );
      });

    this.notifyPropertyChange('model');
  },
  swipeRight() {
    this._dismissAction();
  },
  actions: {
    dismiss() {
      this._dismissAction();
    }
  }
});
