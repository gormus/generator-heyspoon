/*!
 * @file scripts/views/collection/<%= name %>.js
 */

define(
  [
    'backbone'<% if (!itemview_isEmpty) { %>,
    'views/item/<%= itemview %>'<% } %><% if (!inherit_isEmpty) { %>,
    'views/collection/<%= inherit %>'<% } %>
  ],
  function (Backbone<% if (!itemview_isEmpty) { %>, <%= itemview_classify %><% } %><% if (!inherit_isEmpty) { %>, <%= inherit_classify %><% } %>) {
    'use strict';

    // Return a CollectionView class definition.
    return <% if (!inherit_isEmpty) { %><%= inherit_classify %>.extend <% } else { %>Backbone.Marionette.CollectionView.extend<% } %>({
      initialize: function () {
        console.log('Initialize CollectionView: <%= name_classify %>.');
      },<% if (!itemview_isEmpty) { %>
      itemView: <%= itemview_classify %>,
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
