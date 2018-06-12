module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: ['ember'],
  extends: ['eslint:recommended', 'prettier', 'plugin:ember/recommended'],
  env: {
    browser: true
  },
  rules: {
    'ember/avoid-leaking-state-in-ember-objects': 0,
    'ember/no-on-calls-in-components': 0,
    'ember/closure-actions': 0
  },
  overrides: [
    // node files
    {
      files: [
        'ember-cli-build.js',
        'testem.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    },
    // test files
    {
      files: ['tests/**/*.js'],
      excludedFiles: ['tests/dummy/**/*.js'],
      env: {
        embertest: true
      }
    }
  ],

  globals: {
    Promise: true,
    document: true,
    Raven: true,
    embedly: true,
    UserSnap: true,
    window: true,
    FileReader: true,
    requestAnimationFrame: true
  }
};
