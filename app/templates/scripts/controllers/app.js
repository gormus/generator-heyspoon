/*!
 * @file controllers/app.js
 */

define(
  [
    'app',
    'communicator',
    'backbone.marionette',
    'modules/some-module'
  ],
  function (App, Communicator, Marionette, SomeModule) {
    'use strict';

    console.log(Communicator);

    return Marionette.Controller.extend({
      initialize: function () {
        console.log('Initialize App Controller');
      },
      index: function () {
        console.log('Navigate Index Route.');

        SomeModule.newSomeCompositeView(function (view) {
          Communicator.mediator.trigger('NAVIGATE:INDEX:ROUTE', view);
        });
      }
    });
  }
);
