import { get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import IntercomRoute from 'ember-intercom-io/mixins/intercom-route';

const Router = EmberRouter.extend(IntercomRoute, {
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');

      get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('app', { resetNamespace: true, path: '' }, function() {
    this.route('dashboard', { resetNamespace: true, path: '' });
    this.route('game', { resetNamespace: true });

    //
    // User Accounts
    this.route('user', { resetNamespace: true }, function() {
      this.route('edit');
      this.route('notifications');
    });

    //
    // Organization Management
    this.route('organization', { resetNamespace: true }, function() {
      this.route('team');
      this.route('billing', function() {
        this.route('index', { path: '' });
        this.route('information');
        this.route('subscription');
      });
    });

    //
    // Bills
    this.route('bills', { resetNamespace: true }, function() {
      this.route('detail', { path: '/:id' });
      this.route('saved');
      this.route('add');
      this.route('votes', { path: '/:id/votes' });
    });

    //
    // Groups
    this.route('groups', { resetNamespace: true, path: 'clients' }, function() {
      this.route('detail', { path: '/:id' }, function() {
        this.route('bills', { path: '/bills' });
        this.route('bill', { path: '/bill' }, function() {
          this.route('detail', { path: '/:bill' });
        });

        this.route('pages', function() {
          this.route('edit', { path: '/:page/edit' });
          this.route('add');
        });
      });
      this.route('add');
    });

    //
    // Actions
    this.route('todos', { resetNamespace: true }, function() {
      this.route('index', { path: '' });
    });

    //
    // Reports
    this.route('reports', { resetNamespace: true }, function() {
      this.route('add', { path: '/add' });
      this.route('detail', { path: '/:report' });
      this.route('edit', { path: '/:report/edit' });
      this.route('client', { path: '/client/:group' });
      this.route('wizard');
    });

    this.route('committees', { resetNamespace: true }, function() {
      this.route('detail', { path: '/:id' });
      this.route('meetings');
    });

    this.route('legislators', { resetNamespace: true }, function() {
      this.route('detail', { path: '/:id' });
    });

    this.route('files', { resetNamespace: true }, function() {
      this.route('detail', { path: '/:id' });
      this.route('upload');
    });

    // Page Management
    this.route(
      'page-admin',
      { path: 'pages', resetNamespace: true },
      function() {
        this.route('index', { path: '' });
        this.route('detail', { path: '/:id/edit' });
        this.route('updates', { path: '/:id/updates' });
        this.route('update', { path: '/:id/updates/:update' });
        this.route('add');
      }
    );

    //
    // Labs
    this.route('labs', { resetNamespace: true }, function() {
      this.route('index', { path: '' });
      this.route('bill-parse');
      this.route('editor');
      this.route('embedly');
    });
  });

  this.route('freestyle');
  this.route('error-route', { path: 'error' });
  this.route('not-found', { path: '/*path' });
  this.route('welcome', { path: '/dashboard' });

  //
  // Anon Pages
  this.route('anon.claim-invite', { path: 'claim/:id' });
  this.route('anon.login', { path: 'login' });
  this.route('anon.register', { path: 'register' });
  this.route('anon.forgot-password', { path: 'forgot-password' });
  this.route('anon.reset-password', { path: '/reset/:token' });
  this.route('anon.privacy', { path: 'privacy' });
  this.route('anon.legal', { path: 'legal' });
  this.route('anon.redirect', { path: 'r' });
  this.route('anon.page-access', { path: 'r/:page/access' });

  //
  // Note: you need to update the allowedRoutes array in `routes/page.js` for any of this to work
  this.route('page', { path: 'p' }, function() {
    this.route('updates', { path: ':id' });
    this.route('update', { path: ':id/:update' });
    this.route('bills', { path: ':id/bills' });
    this.route('bill', { path: ':id/bill/:bill' });
    this.route('wrapper', { path: ':id/bill/saved/:wrapper' });
  });
});

export default Router;
