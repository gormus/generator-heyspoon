/*!
 * @file communicator.js
 */

define(
  [
    'backbone',
    'backbone.wreqr',
    'backbone.marionette'
  ],
  function (Backbone, Wreqr, Marionette) {
    'use strict';

    var Communicator = Marionette.Controller.extend({
      initialize: function (options) {
        console.log('Initialize a Communicator.');
        console.log('Options:', options);

        // create a pub sub.
        this.mediator = new Backbone.Wreqr.EventAggregator();

        //create a req/res.
        this.reqres = new Backbone.Wreqr.RequestResponse();

        // create commands.
        this.command = new Backbone.Wreqr.Commands();
      }
    });

    return new Communicator();
  }
);
