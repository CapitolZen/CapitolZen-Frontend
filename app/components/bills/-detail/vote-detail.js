import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['vote-detail'],

  breakdown: computed('vote', function() {
    let vote = this.get('vote');
    let total = vote['no-count'] + vote['yes-count'] + vote['other-count'];
    let breakdown = {
      yes: {
        label: 'Yes - ( ' + vote['yes-count'] + ' )',
        percent: vote['yes-count'] / total * 100,
        votes: vote['yes-votes']
      },
      no: {
        label: 'No - ( ' + vote['no-count'] + ' )',
        percent: vote['no-count'] / total * 100,
        votes: vote['no-votes']
      },
      other: {
        label: 'Other - ( ' + vote['other-count'] + ' )',
        percent: vote['other-count'] / total * 100,
        votes: vote['other-votes']
      }
    };

    return breakdown;
  })
});
