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
      desc: 'Template name'
    });

    this.option('template_group', {
      type: String,
      required: false,
      desc: 'Template group'
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

    if (this.options.template_group) {
      this.prop.template_group = this.options.template_group;
    }

    this.prop.silent = this.options.silent;

    if (!this.prop.silent) {
      this.log(yosay(
        'Create a ' + chalk.red('Template') + '!'
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
        message: 'Template Name [templates/GROUP/TEMPLATE-NAME]',
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
        type: 'list',
        name: 'template_group',
        message: 'Template Group?',
        choices: ['Composite', 'Item', 'Layout', 'other'],
        filter: function (val) {
          return val.toLowerCase();
        },
        when: function () {
          return !prop.silent;
        }
      }
    ];

    this.prompt(prompts, function (answers) {
      this.prop.name = prop.name || answers.name;
      this.prop.template_group = prop.template_group || answers.template_group;

      done();
    }.bind(this));
  },

  // Step 4.
  writing: function () {
    var group = this.prop.template_group === 'other' ? '' : this.prop.template_group;

    this.fs.copyTpl(
      this.templatePath('tpl.hbs'),
      this.destinationPath(path.join('app/templates', group, this.prop.name + '.hbs')),
      {
        name: this.prop.name,
        name_classify: _.chain(this.prop.name).camelCase().capitalize(),
        template_group: group
      }
    );
  }
});
