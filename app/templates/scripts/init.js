/*!
 * @file init.js
 */

require(
  [
    'app', // Load our app module and pass it to our definition function.
    'backbone',
    'backbone.marionette'
  ],
  function (App, Backbone, Marionette) {
    'use strict';

    console.log('Backbone', Backbone);
    console.log('Marionette', Marionette);

    App.start();
  }
);
