import Helper from '@ember/component/helper';
import moment from 'moment';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import ENV from 'capitolzen/config/environment';

export default Helper.extend({
  media: service(),
  compute([date], { inputFormat, outputFormat }) {
    let format = get(this, 'format');

    if (outputFormat) {
      format = outputFormat;
    }

    return moment(date, inputFormat).format(format);
  },
  format: computed('media.isMobile', function() {
    return get(this, 'media.isMobile') ? 'MM-DD-YY' : ENV.moment.defaultFormat;
  })
});
