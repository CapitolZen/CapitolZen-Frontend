import jsonBaseAdapter from './json-base';

export default jsonBaseAdapter.extend({
  pathForType: function(type) {
    return 'activities';
  }
});
