/*!
 * @file views/composite/some-view.js
 */

define(
  [
    'backbone',
    'backbone.marionette',
    'views/item/some-view',
    'hbs!templates/composite/some-views_tmpl'
  ],
  function (Backbone, Marionette, SomeItemView, SomeTmpl) {
    'use strict';

    // Return a CompositeView class definition.
    return Marionette.CompositeView.extend({
      tagName: 'div',

      className: 'some-views',

      template: SomeTmpl,

      initialize: function () {
        console.log('Initialize CompositeView: SomeView.');
      },

      // ui selector cache.
      ui: {},

      // where are we appending the items views.
      childView: SomeItemView,

      childViewContainer: 'ul',

      // ui events hash.
      events: {},

      // on render callback.
      onRender: function () {
        // this.collection.fetch();
      }
    });
  }
);
