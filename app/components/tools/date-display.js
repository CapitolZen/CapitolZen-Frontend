import Component from '@ember/component';
import moment from 'moment';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import ENV from 'capitolzen-client/config/environment';

const DateDisplay = Component.extend({
  media: service(),
  tagName: 'span',
  outputFormat: null,
  computedFormat: computed('media.isMobile', function() {
    return get(this, 'media.isMobile') ? 'M/D/YY' : ENV.moment.outputFormat;
  }),
  format: computed('outputFormat', 'computedFormat', function() {
    return get(this, 'outputFormat')
      ? get(this, 'outputFormat')
      : get(this, 'computedFormat');
  }),
  output: computed('date', 'format', 'media.isMobile', function() {
    let date = get(this, 'date'),
      format = get(this, 'format');

    return moment(date).format(format);
  })
});

DateDisplay.reopenClass({
  positionalParams: ['date', 'outputFormat']
});

export default DateDisplay;
