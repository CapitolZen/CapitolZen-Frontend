import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dashboard');
  this.route('login');
  this.route('register');

  this.route('admin', function() {
    this.route('organizations', function() {
      this.route('detail');
    });

    this.route('users', function() {
      this.route('detail');
    });
  });

  this.route('organization', function() {
    this.route('detail');
    this.route('edit');
  });

  this.route('user', function() {
    this.route('detail');
    this.route('edit');
  });
  this.route('bills', function() {
    this.route('detail', {path: '/:id'});
    this.route('add');
    this.route('search');
    this.route('comments');
    this.route('notes');
    this.route('share');
    this.route('source');
  });
  this.route('groups', function() {
    this.route('edit');
    this.route('add');
    this.route('contacts');
    this.route('bills');
    this.route('message');
    this.route('reports', function() {
      this.route('edit');
      this.route('list');
    });
  });
});

export default Router;
