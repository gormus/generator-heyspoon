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
      desc: 'Model name'
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
        'Create a ' + chalk.red('Model') + '!' +
        'You can also inherit another model. And create them if you want.'
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
        message: 'Model Name [scripts/models/MODEL-NAME]',
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
        name: 'model',
        message: 'Inherit another model? [scripts/models/MODEL-NAME]',
        filter: _.kebabCase,
        when: function () {
          return !prop.silent;
        }
      },
      {
        type: 'confirm',
        name: 'create_model',
        message: 'Create inherited module?',
        default: false,
        when: function (answers) {
          return !prop.silent && (answers.model !== '');
        }
      }
    ];

    this.prompt(prompts, function (answers) {
      this.prop.name              = prop.name || answers.name;
      this.prop.model             = prop.model || answers.model;
      this.prop.create_model      = answers.create_model || false;

      // this.log('Answers');
      // this.log(this.prop);

      done();
    }.bind(this));
  },

  // Step 4.
  writing: function () {
    if (this.prop.create_model) {
      this.composeWith('heyspoon:model', { options: {
        name: this.prop.model,
        silent: true
      }});
    }

    this.fs.copyTpl(
      this.templatePath('model.js'),
      this.destinationPath(path.join('app/scripts/models', this.prop.name + '.js')),
      {
        name: this.prop.name,
        name_classify: _.chain(this.prop.name).camelCase().capitalize(),
        inherit: this.prop.model,
        inherit_isEmpty: _.isEmpty(this.prop.model),
        inherit_classify: _.chain(this.prop.model + 'Model').camelCase().capitalize(),
      }
    );
  }
});
