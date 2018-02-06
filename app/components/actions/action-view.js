import Component from '@ember/component';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias, equal, not } from '@ember/object/computed';
import { later } from '@ember/runloop';

export default Component.extend(RecognizerMixin, {
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  classNames: ['action-summary'],
  classNameBindings: [
    'actualClassNames',
    'isDismissed:action-leave',
    'isLoading'
  ],

  isDismissed: false,
  didLoad: false,
  isLoading: not('didLoad'),
  actualClassNames: alias('model.state'),

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
    set(this, 'isDismissed', true);
    later(
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
        }),
      10000
    );

    this.notifyPropertyChange('model');
  },
  swipeRight() {
    this._dismissAction();
  },
  actions: {
    dismiss() {
      this._dismissAction();
    },
    didLoad() {
      set(this, 'didLoad', true);
    }
  }
});
