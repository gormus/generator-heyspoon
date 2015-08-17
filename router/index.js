/*jshint latedef:false */
var _ = require('lodash'),
    yeoman  = require('yeoman-generator'),
    yosay = require('yosay'),
    chalk = require('chalk'),
    path = require('path');

module.exports = yeoman.Base.extend({
  // Step 1.
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.option('name', {
      type: String,
      required: false,
      desc: 'Router name'
    });

    this.option('silent', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'Silent mode'
    });
  },

  // Step 2.
  initializing: function() {
    this.prop = {};

    if (this.options.name) {
      this.prop.name = _.kebabCase(this.options.name);
    }

    this.prop.silent = this.options.silent;

    if (!this.prop.silent) {
      this.log(yosay(
        'Create a ' + chalk.red('Router') + '!'
      ));
    }
    // this.log('initialized');
    // this.log(this.prop);
  },

  // Step 3.
  prompting: function () {
    var prop = this.prop;

    var done = this.async();

    var prompts = [
      {
        name: 'name',
        message: 'Router Name [scripts/routers/ROUTER-NAME]',
        filter: _.kebabCase,
        default: prop.name,
        validate: function (str) {
          return str.length > 0;
        },
        when: function () {
          return !prop.silent;
        }
      }
    ];

    this.prompt(prompts, function (answers) {
      this.prop.name = prop.name || answers.name;

      done();
    }.bind(this));
  },

  // Step 4.
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('router.js'),
      this.destinationPath(path.join('app/scripts/routers', this.prop.name + '.js')),
      {
        name: this.prop.name,
        name_classify: _.chain(this.prop.name).camelCase().capitalize()
      }
    );
  }
});
