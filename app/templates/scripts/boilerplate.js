/*!
 * @file boilerplate.js
 *
 * This file is a boilerplate.
 *  - Do not use as it is.
 *  - Remove jshint comment line on the real files.
 */

/*jshint -W098 */
define(
  [
    // These are path alias that we configured in our bootstrap
    'jquery',
    'underscore',
    'backbone'
  ],
  function ($, _, Backbone) {
    'use strict';

    // Above we have passed in jQuery, Underscore and Backbone
    // They will not be accessible in the global scope
    return {};
    // What we return here will be used by other modules
  }
);
