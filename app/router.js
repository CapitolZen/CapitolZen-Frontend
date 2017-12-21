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
      this.route('billing');
    });

    //
    // Bills
    this.route('bills', { resetNamespace: true }, function() {
      this.route('detail', { path: '/:id' });
      // this.route('saved');
      this.route('add');
      // this.route('search');
    });

    //
    // Groups
    this.route('groups', { resetNamespace: true, path: 'clients' }, function() {
      this.route('detail', { path: '/:id' }, function() {
        this.route('bills', { path: '/bills' });
        this.route('bill', { path: '/bill' }, function() {
          this.route('detail', { path: '/:bill' });
        });
      });
      this.route('add');
    });

    //
    // Reports
    this.route('reports', { resetNamespace: true }, function() {
      this.route('add', { path: '/add' });
      this.route('detail', { path: '/:report' });
      this.route('edit', { path: '/:report/edit' });
      this.route('client', { path: '/client/:group' });
    });

    this.route('committees', { resetNamespace: true }, function() {
      this.route('detail', { path: '/:id' });
      this.route('meetings');
    });

    this.route('legislators', { resetNamespace: true }, function() {
      this.route('detail', { path: '/:id' });
    });

    this.route('files', { resetNamespace: true });
    this.route('actions', function() {});
  });

  this.route('freestyle');
  this.route('error-route', { path: 'error' });
  this.route('not-found', { path: '/*path' });

  //
  // Anon Pages
  this.route('anon.claim-invite', { path: 'claim/:id' });
  this.route('anon.login', { path: 'login' });
  this.route('anon.register', { path: 'register' });
  this.route('anon.forgot-password', { path: 'forgot-password' });
  this.route('anon.reset-password', { path: '/reset/:token' });
});

export default Router;
