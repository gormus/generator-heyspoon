/*!
 * @file scripts/controllers/<%= name %>.js
 */

define(
  [
    'backbone.marionette'<% if (!inherit_isEmpty) { %>,
    'controllers/<%= inherit %>'<% } %>
  ],
  function (Marionette<% if (!inherit_isEmpty) { %>, <%= inherit_classify %><% } %>) {
    'use strict';

    return <% if (!inherit_isEmpty) { %><%= inherit_classify %>.extend <% } else { %>Marionette.Controller.extend<% } %>({
      initialize: function (options) {
        console.log('Initialize Controller: <%= name_classify %>.');
        console.log(options);
      }
    });
  }
);
