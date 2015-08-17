/*!
 * @file views/layout/app.js
 */

define(
  [
    'backbone',
    'backbone.marionette',
    'hbs!templates/layout/app_tmpl'
  ],
  function (Backbone, Marionette, AppTmpl) {
    'use strict';

    // Return a Layout class definition.
    return Marionette.LayoutView.extend({
      tagName: 'div',

      className: 'application',

      template: AppTmpl,

      initialize: function () {
        console.log('Initialize LayoutView: Application Layout.');
        this.render();
      },

      ui: {
        content: 'main.main > .content'
      },

      onRender: function () {
        $('#page').prepend(this.$el);
      }
    });
  }
);
