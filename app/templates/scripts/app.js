/*!
 * @file app.js
 */

define(
  [
    'jquery',
    'underscore',
    'backbone',
    'backbone.marionette',
    'communicator',
    'controllers/app',
    'routers/app',
    'views/layout/app'
  ],
  function ($, _, Backbone, Marionette, Communicator, AppController, AppRouter, AppLayoutView) {
    'use strict';

    var App = new Marionette.Application();

    App.on('start', function() {
      var controller = new AppController();
      var router = new AppRouter({
        controller: controller
      });

      console.log('Router', router);
      this.view = new AppLayoutView();
      Backbone.history.start();
    });

    Communicator.mediator.on('NAVIGATE:INDEX:ROUTE', function(view) {
      App.view.ui.content.append(view.render().$el);
    });

    return App;
  }
);
