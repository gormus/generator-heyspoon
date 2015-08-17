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
      desc: 'Layout name'
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
        'Create a ' + chalk.red('Layout') + '!' +
        ' You can also inherit another layout or a template. And create them if you want.'
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
        message: 'Layout Name [scripts/views/layout/LAYOUT-NAME]',
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
        name: 'layout',
        message: 'Inherit another layout? [scripts/views/layout/LAYOUT-NAME]',
        filter: _.kebabCase,
        when: function () {
          return !prop.silent;
        }
      },
      {
        type: 'confirm',
        name: 'create_layout',
        message: 'Create inherited Layout?',
        default: false,
        when: function (answers) {
          return !prop.silent && (answers.layout !== '');
        }
      },
      {
        type: 'input',
        name: 'template',
        message: 'Inherit a Template? [templates/layout/TEMPLATE-NAME]',
        filter: _.kebabCase,
        when: function () {
          return !prop.silent;
        }
      },
      {
        type: 'confirm',
        name: 'create_template',
        message: 'Create inherited Template?',
        default: false,
        when: function (answers) {
          return !prop.silent && (answers.template !== '');
        }
      },
    ];

    this.prompt(prompts, function (answers) {
      this.prop.name              = prop.name || answers.name;
      this.prop.layout            = prop.layout || answers.layout;
      this.prop.create_layout     = answers.create_layout || false;
      this.prop.template          = prop.template || answers.template;
      this.prop.template_group    = prop.template_group || answers.template_group;
      this.prop.create_template   = answers.create_template || false;

      // this.log('Answers');
      // this.log(this.prop);

      done();
    }.bind(this));
  },

  // Step 4.
  writing: function () {
    if (this.prop.create_layout) {
      this.composeWith('heyspoon:layout', { options: {
        name: this.prop.layout,
        silent: true
      }});
    }

    if (this.prop.create_template) {
      this.composeWith('heyspoon:tpl', { options: {
        name: this.prop.template,
        template_group: 'layout',
        silent: true
      }});
    }

    this.fs.copyTpl(
      this.templatePath('layout.js'),
      this.destinationPath(path.join('app/scripts/views/layout', this.prop.name + '.js')),
      {
        name: this.prop.name,
        name_classify: _.chain(this.prop.name).camelCase().capitalize(),
        inherit: this.prop.layout,
        inherit_isEmpty: _.isEmpty(this.prop.layout),
        inherit_classify: _.chain(this.prop.layout + 'Layout').camelCase().capitalize(),
        template: this.prop.template,
        template_group: 'layout',
        template_isEmpty: _.isEmpty(this.prop.template),
        template_classify: _.chain(this.prop.template + 'Tpl').camelCase().capitalize()
      }
    );
  }
});
