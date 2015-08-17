/*!
 * @file routers/app.js
 */

define(
  [
    'backbone'
  ],
  function (Backbone) {
    'use strict';

    return Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        '(/)': 'index'
      }
    });
  }
);
