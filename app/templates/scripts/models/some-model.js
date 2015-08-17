/*!
 * @file models/some-model.js
 */

define(
  [
    'backbone'
  ],
  function (Backbone) {
    'use strict';

    // Return a model class definition.
    return Backbone.Model.extend({
      initialize: function () {

        console.log('Initialize model: Some Model.');

      }
    });
  }
);
