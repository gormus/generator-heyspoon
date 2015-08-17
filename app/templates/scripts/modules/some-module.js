/*!
 * @file modules/some-module.js
 */

define(
  [
    'app',
    'collections/some-collection',
    'views/composite/some-views'
  ],
  function (App, SomeCollection, SomeCompositeView) {
    'use strict';

    return {
      newSomeCompositeView: function (callback) {
        var collection = new SomeCollection();
        collection.fetch({
          success: function (collection) {
            var view = new SomeCompositeView({
              collection: collection
            });
            callback(view);
          },
          error: function (a, b) {
            console.log(a, b);
          }
        });
      }
    };
  }
);
