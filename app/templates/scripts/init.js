/*!
 * @file init.js
 */

require(
  [
    'app' // Load our app module and pass it to our definition function.
  ],
  function (App) {
    'use strict';

    // The "app" dependency is passed in as "App".
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function.
    App.initialize();
  }
);
