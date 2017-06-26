/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'capitolzen-client',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };
  let apiHost = '', clientHost = '';

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    apiHost = 'http://localhost:8000';
    clientHost = 'http://localhost:4200';

    ENV.contentSecurityPolicy = {
      'script-src': "'self' 'unsafe-inline'",
      'connect-src': "'self' http://localhost:*",
      'default-src': "'none'",
      'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
      'font-src': "'self' fonts.gstatic.com data: ",
      'img-src': "'self' *.gravatar.com *.wp.com data:",
      'media-src': "'self'"
    };

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    apiHost = 'https://api.capitolzen.com';
    clientHost = 'https://app.capitolzen.com';

    ENV.contentSecurityPolicy = {
      'script-src': "'self' 'unsafe-inline'",
      'connect-src': "'self' http://localhost:*",
      'default-src': "'none'",
      'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
      'font-src': "'self' fonts.gstatic.com data: ",
      'img-src': "'self' *.gravatar.com *.wp.com data:",
      'media-src': "'self'"
    };


  }

  ENV.apiURL = apiHost;
  ENV.clientUrl = clientHost;

  ENV.APP.usingCors = true;
  ENV.APP.corsWithCreds = true;

  ENV['ember-simple-auth'] = {
    store: 'simple-auth-session-store:local-storage',
    authorizer: 'authorizer:application',
    crossOriginWhiteList: ['*'],
    routeAfterAuthentication: 'dashboard'
  };

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: `${apiHost}/api-token-auth/`,
    identificationField: 'username',
    passwordField: 'password',
    tokenPropertyName: 'data.token',
    refreshAccessTokens: true,
    serverTokenRefreshEndpoint: `${apiHost}/api-token-verify/`,
    tokenExpireName: 'exp',
    refreshLeeway: 300,
    crossOriginWhitelist: ['*'],
    headers: {
      'Accept': '*/*',
    }
  };


  return ENV;
};
