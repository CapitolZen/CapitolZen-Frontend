import { underscore } from '@ember/string';
import { computed } from '@ember/object';
import { pluralize } from 'ember-inflector';
import { inject as service } from '@ember/service';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  session: service(),
  namespace: '',
  pathForType: function(type) {
    const underscored = underscore(type);
    return pluralize(underscored);
  },
  host: computed(function() {
    return ENV.APP.API_HOST;
  }),

  authorize(xhr) {
    let idToken = this.get('session.data.authenticated.data.token');
    xhr.setRequestHeader('Authorization', `Bearer ${idToken}`);

    if (this.get('session.data.currentOrganizationId')) {
      xhr.setRequestHeader(
        'X-Organization',
        this.get('session.data.currentOrganizationId')
      );
    }

    if (this.get('session.data.currentPageId')) {
      xhr.setRequestHeader('X-Page', this.get('session.data.currentPageId'));
    }
  },

  headers: computed('session', 'session.data.currentPageId', function() {
    let headers = {};
    if (!this.get('session.isAuthenticated')) {
      headers['X-Page'] = this.get('session.data.currentPageId');
    }
    return headers;
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
