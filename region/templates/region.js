/*!
 * @file scripts/regions/<%= name %>.js
 */

define(
  [
    'backbone'<% if (!inherit_isEmpty) { %>,
    'regions/<%= inherit %>'<% } %>
  ],
  function (Backbone<% if (!inherit_isEmpty) { %>, <%= inherit_classify %><% } %>) {
    'use strict';

    // Return a Region class definition.
    return <% if (!inherit_isEmpty) { %><%= inherit_classify %>.extend <% } else { %>Backbone.Marionette.Region.extend<% } %>({
      initialize: function () {
        console.log('Initialize Region: <%= name_classify %>');
      }
    });
  }
);
