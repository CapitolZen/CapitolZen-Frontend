import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  //
  // Anon Pages
  this.route('anon.login', {path: 'login'});
  this.route('anon.register', {path: 'register'});
  this.route('anon.forgot-password', {path: 'forgot-password'});


  this.route('app', {resetNamespace: true, path: ''}, function() {
    this.route('index', {resetNamespace: true, path: ''});
    this.route('dashboard', {resetNamespace: true, });

    //
    // User Accounts
    this.route('user', {resetNamespace: true}, function() {
      this.route('edit');
    });

    //
    // Organization Management
    this.route('organization', {resetNamespace: true}, function() {
      this.route('edit', {path: '/:id'});
    });

    //
    // Bills
    this.route('bills', {resetNamespace: true}, function() {
      this.route('detail', {path: '/:id'});
      this.route('add');
      this.route('search');
      this.route('comments', {path: '/:id/comments'});
      this.route('notes', {path: '/:id/notes'});
      this.route('share', {path: '/:id/share'});
      this.route('source', {path: '/:id/source'});
    });

    //
    // Groups
    this.route('groups', {resetNamespace: true}, function() {
      this.route('detail', {path: '/:id'});
      this.route('edit', {path: '/:id/edit'});
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


  //
  // Administration
  this.route('admin', function() {
    this.route('organizations', function() {
      this.route('detail');
    });

    this.route('users', function() {
      this.route('detail');
    });
  });

});

export default Router;
