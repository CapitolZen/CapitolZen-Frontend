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

  ENV.metricsAdapters = [
    {
      name: 'Mixpanel',
      environments: ['production'],
      config: {
        token: '697313648bce64aa237fc55a76d00567'
      }
    },
  ];

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.apiURL = 'http://localhost:8000';
    ENV.clientUrl = 'http://localhost:4200';

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
    ENV.apiURL = 'https://api.capitolzen.com';
    ENV.clientUrl = 'https://app.capitolzen.com';

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



  ENV.APP.usingCors = true;
  ENV.APP.corsWithCreds = true;

  ENV['ember-simple-auth'] = {
    store: 'simple-auth-session-store:local-storage',
    authorizer: 'authorizer:application',
    crossOriginWhiteList: ['*'],
    authenticationRoute: 'anon.login',
    routeAfterAuthentication: 'dashboard'
  };

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: `${ENV.apiURL}/api-token-auth/`,
    identificationField: 'username',
    passwordField: 'password',
    tokenPropertyName: 'data.token',
    refreshAccessTokens: true,
    serverTokenRefreshEndpoint: `${ENV.apiURL}/api-token-verify/`,
    tokenExpireName: 'exp',
    refreshLeeway: 300,
    crossOriginWhitelist: ['*'],
    headers: {
      'Accept': '*/*',
    }
  };


  return ENV;
};
