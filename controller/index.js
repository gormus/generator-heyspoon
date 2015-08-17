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
      desc: 'Controller name'
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
        'Create a ' + chalk.red('Controller') + '!' +
        'You can also inherit another controller. And create them if you want.'
      ));
    }
  },

  // Step 3.
  prompting: function () {
    var prop = this.prop;

    var done = this.async();

    var prompts = [
      {
        name: 'name',
        message: 'Controller Name [scripts/controllers/CONTROLLER-NAME]',
        filter: _.kebabCase,
        default: prop.name,
        validate: function (str) {
          return str.length > 0;
        },
        when: function () {
          return !prop.silent;
        }
      },
      {
        type: 'input',
        name: 'controller',
        message: 'Inherit another controller? [scripts/controllers/CONTROLLER-NAME]',
        filter: _.kebabCase,
        when: function () {
          return !prop.silent;
        }
      },
      {
        type: 'confirm',
        name: 'create_controller',
        message: 'Create inherited controller?',
        default: false,
        when: function (answers) {
          return !prop.silent && (answers.controller !== '');
        }
      }
    ];

    this.prompt(prompts, function (answers) {
      this.prop.name              = prop.name || answers.name;
      this.prop.controller        = prop.controller || answers.controller;
      this.prop.create_controller = answers.create_controller || false;

      done();
    }.bind(this));
  },

  // Step 4.
  writing: function () {
    if (this.prop.create_controller) {
      this.composeWith('heyspoon:controller', { options: {
        name: this.prop.controller,
        silent: true
      }});
    }

    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath(path.join('app/scripts/controllers', this.prop.name + '.js')),
      {
        name: this.prop.name,
        name_classify: _.chain(this.prop.name).camelCase().capitalize(),
        inherit: this.prop.controller,
        inherit_isEmpty: _.isEmpty(this.prop.controller),
        inherit_classify: _.chain(this.prop.controller + 'Controller').camelCase().capitalize(),
      }
    );
  }
});
