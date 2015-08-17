/*!
 * @file views/item/some-view.js
 */

define(
  [
    'backbone',
    'backbone.marionette',
    'hbs!templates/item/some-view_tmpl'
  ],
  function (Backbone, Marionette, SomeViewTmpl) {
    'use strict';

    // Return a ItemView class definition.
    return Marionette.ItemView.extend({
      tagName: 'li',

      className: 'some-view',

      initialize: function () {
        console.log('Initialize ItemView: SomeView.');
      },

      template: SomeViewTmpl,

      // ui selector cache.
      ui: {},

      // ui events hash.
      events: {},

      // on render callback.
      onRender: function () {}
    });
  }
);
