/*!
 * @file scripts/views/layout/<%= name %>.js
 */

define(
  [
  	'backbone'<% if (!inherit_isEmpty) { %>,
  	'views/layout/<%= inherit %>'<% } %><% if (!template_isEmpty) { %>,
    'hbs!templates/<%= template_group %>/<%= template %>'<% } %>
  ],
  function (Backbone<% if (!inherit_isEmpty) { %>, <%= inherit_classify %><% } %><% if (!template_isEmpty) { %>, <%= template_classify %> <% } %>) {
    'use strict';

  	// Return a Layout class definition.
  	return <% if (!inherit_isEmpty) { %><%= inherit_classify %>.extend <% } else { %>Backbone.Marionette.Layout.extend<% } %>({
  		initialize: function() {
  			console.log('Initialize Layout: <%= name_classify %>.');
  		},
      <% if (!template_isEmpty) { %>
    	template: <%= template_classify %>,
    	<% } %>
    	/* Layout sub regions */
    	regions: {},

    	/* ui selector cache */
    	ui: {},

  		/* Ui events hash */
  		events: {},

  		/* on render callback */
  		onRender: function() {}
  	});
  }
);
