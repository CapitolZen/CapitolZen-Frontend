/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: 'Capitol Zen',
    short_name: 'Capitol Zen',
    description: 'Enlightenment by Intuition',
    start_url: '/login',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#006a59',
    icons: [
      {
        src: '/assets/images/logo-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/assets/images/logo-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    ms: {
      tileColor: '#006a59'
    }
  };
};
