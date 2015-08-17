/*!
 * @file scripts/views/<%= name %>.js
 */

define(
  [
    'backbone'
  ],
  function (Backbone) {
    'use strict';

    return Backbone.View.extend({
      initialize: function () {
        console.log('Initialize View: <%= name_classify %>');
      }
    });
  }
);
