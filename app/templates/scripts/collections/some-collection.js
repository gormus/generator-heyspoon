/*!
 * @file collections/some-collection.js
 */

define(
  [
    'backbone',
    'models/some-model'
  ],
  function (Backbone, SomeModelModel) {
    'use strict';

    /* Return a collection class definition */
    return Backbone.Collection.extend({
      model: SomeModelModel,
      url: 'http://jsonplaceholder.typicode.com/posts',
      dataType: 'json',
      initialize: function () {
        console.log('Initialize collection: SomeCollection.');
      }
    });
  }
);
