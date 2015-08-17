/*!
 * @file scripts/models/<%= name %>.js
 */

define(
  [
    'backbone'<% if (!inherit_isEmpty) { %>,
    'models/<%= inherit %>'<% } %>
  ],
  function (Backbone<% if (!inherit_isEmpty) { %>, <%= inherit_classify %><% } %>) {
    'use strict';

    // Return a model class definition.
    return <% if (!inherit_isEmpty) { %><%= inherit_classify %>.extend <% } else { %>Backbone.Model.extend<% } %>({
      initialize: function () {
        console.log('Initialize model: <%= name_classify %>.');
      },

      defaults: {},

    });
  }
);
