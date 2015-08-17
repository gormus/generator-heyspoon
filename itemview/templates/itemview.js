/*!
 * @file scripts/views/item/<%= name %>.js
 */

define(
  [
    'backbone'<% if (!itemview_isEmpty) { %>,
    'views/item/<%= itemview %>'<% } %><% if (!template_isEmpty) { %>,
    'hbs!templates/<%= template_group %>/<%= template %>'<% } %>
  ],
  function (Backbone<% if (!itemview_isEmpty) { %>, <%= itemview_classify %><% } %><% if (!template_isEmpty) { %>, <%= template_classify %><% } %>) {
    'use strict';

    // Return a ItemView class definition.
    return <% if (!itemview_isEmpty) { %><%= itemview_classify %>.extend <% } else { %>Backbone.Marionette.ItemView.extend<% } %>({
      initialize: function () {
        console.log('Initialize ItemView: <%= name_classify %>.');
      },<% if (!template_isEmpty) { %>
      template: <%= template_classify %>,
      <% } %>
      /* ui selector cache */
      ui: {},

      /* Ui events hash */
      events: {},

      /* on render callback */
      onRender: function () {}
    });
  }
);
