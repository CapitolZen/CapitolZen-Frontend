import { underscore } from '@ember/string';
import { computed } from '@ember/object';
import Ember from 'ember';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  namespace: '',
  authorizer: 'authorizer:application',
  pathForType: function(type) {
    const underscored = underscore(type);
    return Ember.String.pluralize(underscored);
  },
  host: computed(function() {
    return ENV.APP.API_HOST;
  }),

  // Deals with django
  buildURL(modelName, id, snapshot, requestType, query) {
    //
    // Fixup the filter formatting until:
    // https://github.com/django-json-api/django-rest-framework-json-api/pull/286 gets merged in.
    if (typeof query === 'object') {
      let filter = query['filter'];
      for (let p in filter) {
        if (filter.hasOwnProperty(p)) {
          query[p] = filter[p];
        }
      }
      delete query['filter'];
    }

    let url = this._super(modelName, id, snapshot, requestType, query);

    //
    // Append slashes to make Django happy.
    if (url.charAt(url.length - 1) !== '/') {
      url += '/';
    }
    return url;
  }
});
