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
    this.route('detail', {path: '/:id'});
    this.route('edit', {path: '/:id'});
  });

  this.route('user', function() {
    this.route('detail');
    this.route('edit');
  });
  this.route('bills', function() {
    this.route('detail', {path: '/:id'});
    this.route('add');
    this.route('search');
    this.route('comments', {path: '/:id/comments'});
    this.route('notes', {path: '/:id/notes'});
    this.route('share', {path: '/:id/share'});
    this.route('source', {path: '/:id/source'});
  });
  this.route('groups', function() {
    this.route('edit', {path: '/:id'});
    this.route('add');
    this.route('contacts', {path: '/:id/contacts'});
    this.route('bills', {path: '/:id/bills'});
    this.route('message', {path: '/:id/message'});
    this.route('reports', {path: '/:id/reports'}, function() {
      this.route('edit');
      this.route('list');
    });
  });
});

export default Router;
