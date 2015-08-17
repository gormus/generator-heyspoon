/*!
 * @file scripts/views/collection/<%= name %>.js
 */

define(
  [
    'backbone'<% if (!itemview_isEmpty) { %>,
    'views/item/<%= itemview %>'<% } %><% if (!inherit_isEmpty) { %>,
    'views/composite/<%= inherit %>'<% } %><% if (!template_isEmpty) { %>,
    'hbs!templates/<%= template_group %>/<%= template %>'<% } %>
  ],
  function (Backbone<% if (!itemview_isEmpty) { %>, <%= itemview_classify %><% } %><% if (!inherit_isEmpty) { %>, <%= inherit_classify %><% } %><% if (!template_isEmpty) { %>, <%= template_classify %><% } %>) {
    'use strict';

    // Return a CompositeView class definition.
    return <% if (!inherit_isEmpty) { %><%= inherit_classify %>.extend <% } else { %>Backbone.Marionette.CompositeView.extend<% } %>({
      initialize: function () {
        console.log('Initialize CompositeView: <%= name_classify %>.');
      },
      <% if (!itemview_isEmpty) { %>
      itemView: <%= itemview_classify %>,<% } %>
      <% if (!template_isEmpty) { %>
      template: <%= template_classify %>,
      <% } %>
      /* ui selector cache */
      ui: {},

      /* where are we appending the items views */
      itemViewContainer: '',

      /* Ui events hash */
      events: {},

      /* on render callback */
      onRender: function () {}
    });
  }
);
