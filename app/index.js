'use strict';

// var chalk = require('chalk');
var fs = require('fs');
var generator = require('yeoman-generator');
var path = require('path');
var util = require('util');
var wiredep = require('wiredep');
var yosay = require('yosay');
var _s = require('underscore.string');

module.exports = generator.Base.extend({
  // Step 1.
  constructor: function () {
    generator.Base.apply(this, arguments);

    this.argument('appname', { type: String, required: false });
    this.appName = this.appName || path.basename(process.cwd());
    this.appName = _s(this.appName).slugify().value();
  },

  // Step 2.
  initializing: function() {
    this.pkg = require('../package.json');
  },

  // Step 3.
  prompting: function() {
    var done = this.async();

    var prompts = [
      {
        type: 'list',
        name: 'frontEnd',
        message: 'Select a front-end framework:',
        choices: [
          {
            name: 'Bootstrap',
            value: 'bootstrap',
            default: true,
          },
          {
            name: 'Foundation',
            value: 'foundation',
          }
        ]
      },
      {
        type: 'confirm',
        name: 'glyphicons',
        message: 'Enable Glyphicons?',
        default: true,
        when: function (answers) {
          return answers.frontEnd === 'bootstrap';
        }
      },
      {
        type: 'confirm',
        name: 'Modernizr',
        message: 'Would you like to include Modernizr?',
        default: true
      }
    ];

    this.prompt(prompts, function (answers) {
      // this.log(answers);
      this.frontEnd              = answers.frontEnd;
      this.includeBootstrap      = (this.frontEnd === 'bootstrap') ? true : false;
      this.includeGlyphicons     = answers.glyphicons;
      this.includeFoundation     = (this.frontEnd === 'foundation') ? true : false;
      this.includeJQuery         = true;
      this.includeModernizr      = answers.Modernizr;

      this.config.defaults({
        frontEnd              : this.frontEnd,
        includeBootstrap      : this.includeBootstrap,
        includeGlyphicons     : this.includeGlyphicons,
        includeFoundation     : this.includeFoundation,
        includeJQuery         : this.includeJQuery,
        includeModernizr      : this.includeModernizr,
      });

      done();
    }.bind(this));
  },

  // Step 4.
  configuring: function() {},

  // Step 5.
  default: function() {},

  // Step 6.
  writing: {
    npm: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          includeModernizr: this.includeModernizr,
        }
      );
    },

    bower: function () {
      var bower = {
        name: _s(this.appName).slugify().value(),
        private: true,
        dependencies: {
          'backbone-amd': '~1.1.0',
          'backbone.babysitter': '~0.1.8',
          'backbone.localStorage': '~1.1.16',
          'backbone.marionette': '~2.4.2',
          'backbone.wreqr': '~1.3.3',
          'require-handlebars-plugin': '~0.11.3',
          'requirejs': '~2.1.19',
          'requirejs-plugins': '~1.0.3',
          'requirejs-text': '~2.0.14',
          'underscore-amd': '~1.5.2',
        },
        ignore: [
          '**/.*',
          'node_modules',
          'bower_components',
          'test',
          'tests'
        ]
      };

      // this.log(this);

      if (this.includeBootstrap) {
        bower.dependencies['bootstrap-sass'] = '~3.3.5';
        bower.overrides = {
          'bootstrap-sass': {
            'main': [
              'assets/stylesheets/_bootstrap.scss',
              'assets/fonts/bootstrap/*',
              'assets/javascripts/bootstrap.js'
            ]
          }
        };
      }
      else if (this.includeFoundation) {
        bower.dependencies['foundation'] = 'zurb/bower-foundation#~5.5.2';
      }


      if (this.includeJQuery) {
        bower.dependencies['jquery'] = '~2.1.4';
      }

      if (this.includeModernizr) {
        bower.dependencies['modernizr'] = '~2.8.3';
      }

      this.copy(
        this.templatePath('_bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.write('bower.json', JSON.stringify(bower, null, 2));
    },

    grunt: function () {
      this.fs.copyTpl(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js'),
        {
          app_name: _s(this.appName).humanize().titleize().value(),
          app_version: this.pkg.version,
          includeBootstrap: this.includeBootstrap,
          includeFoundation: this.includeFoundation,
          includeModernizr: this.includeModernizr
        }
      );
    },

    readme: function () {
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        {
          app_name: _s(this.appName).humanize().titleize().value(),
          app_version: this.pkg.version,
        }
      );
    },

    docs: function () {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html'),
        {
          includeModernizr: this.includeModernizr,
        }
      );

      this.fs.copy(
        this.templatePath('offline.html'),
        this.destinationPath('app/offline.html')
      );

      this.fs.copy(
        this.templatePath('404.html'),
        this.destinationPath('app/404.html')
      );

      this.fs.copy(
        this.templatePath('crossdomain.xml'),
        this.destinationPath('app/crossdomain.xml')
      );

      this.fs.copy(
        this.templatePath('manifest.appcache'),
        this.destinationPath('app/manifest.appcache')
      );

      this.fs.copy(
        this.templatePath('robots.txt'),
        this.destinationPath('app/robots.txt')
      );
    },

    styles: function () {
      this.fs.copyTpl(
        this.templatePath('styles/app.scss'),
        this.destinationPath('app/styles/app.scss'),
        {
          app_name: _s(this.appName).humanize().titleize().value(),
          app_version: this.pkg.version,
          includeBootstrap: this.includeBootstrap,
          includeFoundation: this.includeFoundation
        }
      );

      this.copy(
        this.templatePath('styles/_home.scss'),
        this.destinationPath('app/styles/_home.scss')
      );
    },

    images: function () {
      this.fs.copy(
        this.templatePath('images/*.*'),
        this.destinationPath('app/images/')
      );
    },

    icons: function () {
      this.fs.copy(
        this.templatePath('icons/*.*'),
        this.destinationPath('app/icons/')
      );
    },

    dotFiles: function () {
      this.fs.copy(
        this.templatePath('_editorconfig'),
        this.destinationPath('app/.editorconfig')
      );

      this.fs.copy(
        this.templatePath('_gitattributes'),
        this.destinationPath('.gitattributes')
      );

      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );

      this.fs.copy(
        this.templatePath('_htaccess'),
        this.destinationPath('app/.htaccess')
      );

      this.fs.copy(
        this.templatePath('_jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  // Step 7.
  conflicts: function() {},

  // Step 8.
  install: function() {
    this.installDependencies();
  },

  // Step 9.
  end: function () {
    this.fs.copy(
      this.destinationPath('app/bower_components/requirejs/require.js'),
      this.destinationPath('app/js/vendor/require.js')
    );

    this.fs.copy(
      this.templatePath('scripts/app.js'),
      this.destinationPath('app/scripts/app.js')
    );

    this.fs.copy(
      this.templatePath('scripts/boilerplate.js'),
      this.destinationPath('app/scripts/boilerplate.js')
    );

    this.fs.copy(
      this.templatePath('scripts/init.js'),
      this.destinationPath('app/scripts/init.js')
    );

    this.fs.copyTpl(
      this.templatePath('scripts/mainConfig.js'),
      this.destinationPath('app/scripts/mainConfig.js'),
      {
        includeBootstrap: this.includeBootstrap,
        includeFoundation: this.includeFoundation
      }
    );

    this.fs.copy(
      this.templatePath('scripts/router.js'),
      this.destinationPath('app/scripts/router.js')
    );

    this.fs.copy(
      this.templatePath('scripts/views/home/HomeView.js'),
      this.destinationPath('app/scripts/views/home/HomeView.js')
    );

    this.fs.copy(
      this.templatePath('scripts/templates/home/homeTemplate.hbs'),
      this.destinationPath('app/templates/home/homeTemplate.hbs')
    );

    if (this.includeBootstrap) {
      // Bootstrap's IE10 fix.
      this.copy(
        this.templatePath('scripts/bootstrap_fix_ie10.js'),
        this.destinationPath('app/scripts/bootstrap_fix_ie10.js')
      );

      // Bootstrap SASS files.
      this.fs.copy(
        this.destinationPath('app/bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss'),
        this.destinationPath('app/styles/vendor/_bootstrap.scss'),
        {
          process: function (contents) {
            var c = contents.toString().replace('@import "bootstrap/variables";\n', '');

            return c;
          }
        }
      );

      this.copy(
        this.destinationPath('app/bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss'),
        this.destinationPath('app/styles/vendor/_bootstrap_settings.scss')
      );

      if (this.includeGlyphicons) {
        this.fs.copy(
          this.destinationPath('app/bower_components/bootstrap-sass/assets/fonts/bootstrap/*.*'),
          this.destinationPath('app/fonts/bootstrap/')
        );
      }
      else {
        this.fs.copy(
          this.destinationPath('app/styles/vendor/_bootstrap.scss'),
          this.destinationPath('app/styles/vendor/_bootstrap.scss'),
          {
            process: function (contents) {
              var c = contents.toString().replace('@import "bootstrap/glyphicons";\n', '');
              return c;
            }
          }
        );
      }
    }






    if (this.includeFoundation) {
      this.copy(
        this.destinationPath('app/bower_components/foundation/scss/foundation.scss'),
        this.destinationPath('app/styles/vendor/_foundation.scss')
      );

      this.copy(
        this.destinationPath('app/bower_components/foundation/scss/normalize.scss'),
        this.destinationPath('app/styles/vendor/_normalize.scss')
      );

      this.copy(
        this.destinationPath('app/bower_components/foundation/scss/foundation/_settings.scss'),
        this.destinationPath('app/styles/vendor/_foundation_settings.scss')
      );
    }
  }
});
