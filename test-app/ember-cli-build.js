'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: ['node_modules/bootstrap-sass/assets/stylesheets'],
    },
    autoImport: {
      watchDependencies: ['ember-power-datepicker'],
    },
    babel: {
      plugins: [
        require.resolve('ember-concurrency/async-arrow-task-transform'),
      ],
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app);
};
