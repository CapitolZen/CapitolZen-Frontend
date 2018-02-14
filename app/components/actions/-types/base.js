import Component from '@ember/component';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';
import { get } from '@ember/object';

export default Component.extend(RecognizerMixin, {
  soreMore: false,
  footerClasses: 'd-flex justify-content-center',
  actions: {
    dismiss() {
      get(this, 'dismiss')();
    },
    toggleShowMore() {
      this.toggleProperty('showMore');
    }
  }
});
