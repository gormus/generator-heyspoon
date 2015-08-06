/*!
 * @file HomeView.js
 */

define(
  [
    'jquery',
    'underscore',
    'backbone',
    'hbs!templates/home/homeTemplate'
  ],
  function ($, _, Backbone, homeTemplate) {
    'use strict';

    var HomeView = Backbone.View.extend({
      el: $("#page"),

      render: function () {

        this.$el.html(homeTemplate);

      }
    });

    return HomeView;
  }
);
