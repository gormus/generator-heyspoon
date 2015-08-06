/*!
 * @file mainConfig.js
 *
 * Configuration.
 */

require.config({
  baseUrl: 'scripts',

  paths: {
    'jquery': '../bower_components/jquery/dist/jquery'
    , 'underscore': '../bower_components/underscore-amd/underscore'
    , 'backbone': '../bower_components/backbone-amd/backbone'
    , 'backbone.marionette': '../bower_components/backbone.marionette/lib/core/backbone.marionette'
    , 'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr'
    , 'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter'
    , 'localStorage': '../bower_components/backbone.localStorage/backbone.localStorage'
<% if (includeBootstrap) { %>
    // Use all Bootstrap plug-ins.
    , 'bootstrap': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap'
    , 'bootstrapFixIE10': './bootstrap_fix_ie10'
    // Or call them individually.
    // , 'bootstrapTransition': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js'
    // , 'bootstrapAlert': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap/alert.js'
    // , 'bootstrapButton': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap/button.js'
    // , 'bootstrapCarousel': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap/carousel.js'
    // , 'bootstrapCollapse': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js'
    // , 'bootstrapDropdown': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js'
    // , 'bootstrapModal': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js'
    // , 'bootstrapTooltip': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js'
    // , 'bootstrapPopover': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover.js'
    // , 'bootstrapScrollspy': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js'
    // , 'bootstrapTab': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js'
    // , 'bootstrapAffix': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap/affix.js'
<% } %>
<% if (includeFoundation) { %>
    // Use all Foundation plug-ins.
    , 'foundation': '../bower_components/foundation/js/foundation'
    // Or call them individually.
    // , 'foundation': '../bower_components/foundation/js/foundation/foundation'
    // , 'foundationAbide': '../bower_components/foundation/js/foundation/foundation.abide'
    // , 'foundationAccordion': '../bower_components/foundation/js/foundation/foundation.accordion'
    // , 'foundationAlert': '../bower_components/foundation/js/foundation/foundation.alert'
    // , 'foundationClearing': '../bower_components/foundation/js/foundation/foundation.clearing'
    // , 'foundationDropdown': '../bower_components/foundation/js/foundation/foundation.dropdown'
    // , 'foundationEqualizer': '../bower_components/foundation/js/foundation/foundation.equalizer'
    // , 'foundationInterchange': '../bower_components/foundation/js/foundation/foundation.interchange'
    // , 'foundationJoyride': '../bower_components/foundation/js/foundation/foundation.joyride'
    // , 'foundationMagellan': '../bower_components/foundation/js/foundation/foundation.magellan'
    // , 'foundationOffcanvas': '../bower_components/foundation/js/foundation/foundation.offcanvas'
    // , 'foundationOrbit': '../bower_components/foundation/js/foundation/foundation.orbit'
    // , 'foundationReveal': '../bower_components/foundation/js/foundation/foundation.reveal'
    // , 'foundationSlider': '../bower_components/foundation/js/foundation/foundation.slider'
    // , 'foundationTab': '../bower_components/foundation/js/foundation/foundation.tab'
    // , 'foundationTooltip': '../bower_components/foundation/js/foundation/foundation.tooltip'
    // , 'foundationTopbar': '../bower_components/foundation/js/foundation/foundation.topbar'
<% } %>

    , 'async': '../bower_components/requirejs-plugins/src/async'
    , 'depend': '../bower_components/requirejs-plugins/src/depend'
    , 'font': '../bower_components/requirejs-plugins/src/font'
    , 'goog': '../bower_components/requirejs-plugins/src/goog'
    , 'image': '../bower_components/requirejs-plugins/src/image'
    , 'json': '../bower_components/requirejs-plugins/src/json'
    , 'mdown': '../bower_components/requirejs-plugins/src/mdown'
    , 'noext': '../bower_components/requirejs-plugins/src/noext'
    , 'propertyParser': '../bower_components/requirejs-plugins/src/propertyParser'

    , 'hbs': '../bower_components/require-handlebars-plugin/hbs'
    , 'text': '../bower_components/requirejs-text/text'

    , 'templates': '../templates'
  },

  hbs: {
    // This disables the i18n helper and doesn't require the json i18n files (e.g. en_us.json) (false by default)
    disableI18n: true,
    // When true, won't look for and try to automatically load helpers (false by default)
    disableHelpers: false
  },

  shim: {
<% if (includeBootstrap) { %>
    bootstrap: { deps: ['jquery', 'bootstrapFixIE10'] },
    // bootstrapTransition: { deps: ['jquery', 'bootstrapFixIE10'] },
    // bootstrapAlert: { deps: ['jquery', 'bootstrapFixIE10'] },
    // bootstrapButton: { deps: ['jquery', 'bootstrapFixIE10'] },
    // bootstrapCarousel: { deps: ['jquery', 'bootstrapFixIE10'] },
    // bootstrapCollapse: { deps: ['jquery', 'bootstrapFixIE10'] },
    // bootstrapDropdown: { deps: ['jquery', 'bootstrapFixIE10'] },
    // bootstrapModal: { deps: ['jquery', 'bootstrapFixIE10'] },
    // bootstrapTooltip: { deps: ['jquery', 'bootstrapFixIE10'] },
    // bootstrapPopover: { deps: ['jquery', 'bootstrapFixIE10'] },
    // bootstrapScrollspy: { deps: ['jquery', 'bootstrapFixIE10'] },
    // bootstrapTab: { deps: ['jquery', 'bootstrapFixIE10'] },
    // bootstrapAffix: { deps: ['jquery', 'bootstrapFixIE10'] },
<% } %>
<% if (includeFoundation) { %>
    foundation: { deps: ['jquery'] },
    // foundationAbide: { deps: ['jquery', 'foundation'] },
    // foundationAccordion: { deps: ['jquery', 'foundation'] },
    // foundationAlert: { deps: ['jquery', 'foundation'] },
    // foundationClearing: { deps: ['jquery', 'foundation'] },
    // foundationDropdown: { deps: ['jquery', 'foundation'] },
    // foundationEqualizer: { deps: ['jquery', 'foundation'] },
    // foundationInterchange: { deps: ['jquery', 'foundation'] },
    // foundationJoyride: { deps: ['jquery', 'foundation'] },
    // foundationMagellan: { deps: ['jquery', 'foundation'] },
    // foundationOffcanvas: { deps: ['jquery', 'foundation'] },
    // foundationOrbit: { deps: ['jquery', 'foundation'] },
    // foundationReveal: { deps: ['jquery', 'foundation'] },
    // foundationSlider: { deps: ['jquery', 'foundation'] },
    // foundationTab: { deps: ['jquery', 'foundation'] },
    // foundationTooltip: { deps: ['jquery', 'foundation'] },
    // foundationTopbar: { deps: ['jquery', 'foundation'] },
<% } %>

    underscore: {
      exports: '_'
    },

    backbone: {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    },

    marionette: {
      exports: 'Backbone.Marionette',
      deps: ['backbone']
    }
  },

  waitSeconds: 7 // Default: 7
});
