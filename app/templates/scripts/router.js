/*!
 * @file router.js
 */

define(
  [
    'jquery',
    'underscore',
    'backbone',
    'views/home/HomeView',
  ],
  function ($, _, Backbone, HomeView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
      routes: {
        // Define some URL routes
        // 'projects': 'showProjects',

        // Default
        '*actions': 'defaultAction'
      }
    });

    var initialize = function () {
      var route = new AppRouter();

      route.on('route:defaultAction', function () {
        // We have no matching route, lets display the home page
        var homeView = new HomeView();
        homeView.render();
      });

      Backbone.history.start();

      // this.bind('route', this._pageView);
    };

    // var _pageView = function () {
    //   var path = Backbone.history.getFragment();
    //   ga('send', 'pageview', {page: '/' + path});
    // };

    return {
      initialize: initialize
    };
  }
);
