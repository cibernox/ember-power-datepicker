import EmberRouter from '@ember/routing/router';
import config from './config/environment';

class Router extends EmberRouter {
  location = config.locationType
  rootURL = config.rootURL
}

Router.map(function() {
  this.route('public-pages', { path: '' }, function() {

  });
  this.route('legacy-demo');
  this.route('helpers-testing');
});

export default Router;
