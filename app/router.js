import Ember from 'ember';
import config from './config/environment';
import IntercomRoute from 'ember-intercom-io/mixins/intercom-route';

const Router = Ember.Router.extend(IntercomRoute, {
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: Ember.inject.service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('app', { resetNamespace: true, path: '' }, function() {
    this.route('dashboard', { resetNamespace: true, path: '' });

    //
    // User Accounts
    this.route('user', { resetNamespace: true }, function() {
      this.route('edit');
      this.route('notifications');
    });

    //
    // Organization Management
    this.route('organization', { resetNamespace: true }, function() {
      this.route('team', { path: '/team' });
      this.route('billing', { path: '/billing' });
      this.route('edit', { path: '/:id' });
    });

    //
    // Bills
    this.route('bills', { resetNamespace: true }, function() {
      this.route('detail', { path: '/:id' });
      this.route('saved');
      this.route('add');
      this.route('search');
      this.route('comments', { path: '/:id/comments' });
      this.route('notes', { path: '/:id/notes' });
      this.route('share', { path: '/:id/share' });
      this.route('source', { path: '/:id/source' });
    });

    //
    // Groups
    this.route('groups', { resetNamespace: true, path: 'clients' }, function() {
      this.route('group', { path: '/:id' }, function() {
        this.route('edit', { path: '/edit' });
        this.route('contacts', { path: '/contacts' });
        this.route('bills', { path: '/bills' });
        this.route('bill', { path: '/bill' }, function() {
          this.route('detail', { path: '/:bill' });
        });
        this.route('message', { path: '/message' });
        this.route('filters', { path: '/filters' });
      });

      this.route('add');
    });

    //
    // Reports
    this.route('reports', { resetNamespace: true }, function() {
      this.route('add', { path: '/add' });
      this.route('detail', { path: '/:report' });
      this.route('edit', { path: '/:report/edit' });
      this.route('client', { path: '/:group' });
    });

    this.route('legislators', { resetNamespace: true }, function() {
      this.route('detail', { path: '/:id' });
    });
  });

  this.route('freestyle');
  // this.route('error-route');
  this.route('not-found', { path: '/*path' });

  //
  // Anon Pages
  this.route('anon.claim-invite', { path: 'claim/:id' });
  this.route('anon.login', { path: 'login' });
  this.route('anon.register', { path: 'register' });
  this.route('anon.forgot-password', { path: 'forgot-password' });
  this.route('anon.reset-password', { path: '/reset/:hash' });
});

export default Router;
