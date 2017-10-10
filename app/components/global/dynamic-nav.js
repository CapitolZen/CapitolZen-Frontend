import Component from '@ember/component';
import { computed, observer, get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import RespondsToScroll from 'ember-responds-to/mixins/responds-to-scroll';
import { debounce } from '@ember/runloop';

export default Component.extend(RespondsToScroll, {
  windoc: service(),
  tagName: 'nav',
  attributeBindings: ['style'],
  classNames: [
    'navbar',
    'bg-primary',
    'nav-header',
    'search-navbar',
    'fixed-top'
  ],
  classNameBindings: ['topNavPosition'],
  cacheTop: 0,
  scrollTop: 0,
  top: alias('windoc.scrollTop'),
  scroll() {
    debounce(
      this,
      function() {
        set(this, 'cacheTop', get(this, 'top'));
      },
      50
    );
  },
  position: computed('media.isMobile', function() {
    if (get(this, 'media.isMobile')) {
      return 'fixed-bottom';
    } else {
      return 'fixed-top';
    }
  }),
  topNavPosition: computed('top', function() {
    return get(this, 'top') <= 15;
  }),
  actions: {
    toggleMenuState() {
      get(this, 'toggler')();
    }
  }
});
