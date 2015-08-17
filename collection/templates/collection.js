/*!
 * @file scripts/collections/<%= name %>.js
 */

define(
  [
    'backbone'<% if (!model_isEmpty) { %>,
    'models/<%= model %>'<% } %><% if (!inherit_isEmpty) { %>,
    'collections/<%= inherit %>'<% } %>
  ],
  function (Backbone<% if (!model_isEmpty) { %>, <%= model_classify %><% } %><% if (!inherit_isEmpty) { %>, <%= inherit_classify %><% } %>) {
    'use strict';

    /* Return a collection class definition */
    return <% if (!inherit_isEmpty) { %><%= inherit_classify %>.extend <% } else { %>Backbone.Collection.extend<% } %>({
      initialize: function () {
        console.log('Initialize collection: <%= name_classify %>.');
      }<% if (!model_isEmpty) { %>,

      model: <%= model_classify %>
      <% } %>
    });
  }
);
