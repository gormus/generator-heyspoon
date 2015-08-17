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
      desc: 'CompositeView name'
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
        'Create a ' + chalk.red('CompositeView') + '!' +
        ' You can also inherit an ItemView, another CompositeView and a template. And create them if you want.'
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
        message: 'CompositeView Name [scripts/views/composite/COMPOSITEVIEW-NAME]',
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
        name: 'compositeview',
        message: 'Inherit another CompositeView? [scripts/views/composite/COMPOSITEVIEW-NAME]',
        filter: _.kebabCase,
        when: function () {
          return !prop.silent;
        }
      },
      {
        type: 'confirm',
        name: 'create_compositeview',
        message: 'Create inherited CompositeView?',
        default: false,
        when: function (answers) {
          return !prop.silent && (answers.compositeview !== '');
        }
      },
      {
        type: 'input',
        name: 'itemview',
        message: 'Inherit an ItemView? [scripts/views/item/ITEMVIEW-NAME]',
        filter: _.kebabCase,
        when: function () {
          return !prop.silent;
        }
      },
      {
        type: 'confirm',
        name: 'create_itemview',
        message: 'Create inherited ItemView?',
        default: false,
        when: function (answers) {
          return !prop.silent && (answers.itemview !== '');
        }
      },
      {
        type: 'input',
        name: 'template',
        message: 'Inherit a Template? [templates/composite/TEMPLATE-NAME]',
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
      }
    ];

    this.prompt(prompts, function (answers) {
      this.prop.name                 = prop.name || answers.name;
      this.prop.itemview             = prop.itemview || answers.itemview;
      this.prop.create_itemview      = answers.create_itemview || false;
      this.prop.template             = prop.template || answers.template;
      this.prop.template_group       = prop.template_group || answers.template_group;
      this.prop.create_template      = answers.create_template || false;
      this.prop.compositeview        = prop.compositeview || answers.compositeview;
      this.prop.create_compositeview = answers.create_compositeview || false;

      // this.log('Answers');
      // this.log(this.prop);

      done();
    }.bind(this));
  },

  // Step 4.
  writing: function () {
    if (this.prop.create_itemview) {
      this.composeWith('heyspoon:itemview', { options: {
        name: this.prop.itemview,
        silent: true
      }});
    }

    if (this.prop.compositeview) {
      this.composeWith('heyspoon:compositeview', { options: {
        name: this.prop.compositeview,
        silent: true
      }});
    }

    if (this.prop.template) {
      this.composeWith('heyspoon:tpl', { options: {
        name: this.prop.template,
        template_group: 'composite',
        silent: true
      }});
    }

    this.fs.copyTpl(
      this.templatePath('compositeview.js'),
      this.destinationPath(path.join('app/scripts/views/composite', this.prop.name + '.js')),
      {
        name: this.prop.name,
        name_classify: _.chain(this.prop.name).camelCase().capitalize(),
        itemview: this.prop.itemview,
        itemview_isEmpty: _.isEmpty(this.prop.itemview),
        itemview_classify: _.chain(this.prop.itemview + 'ItemView').camelCase().capitalize(),
        template: this.prop.template,
        template_group: 'composite',
        template_isEmpty: _.isEmpty(this.prop.template),
        template_classify: _.chain(this.prop.template + 'Tpl').camelCase().capitalize(),
        inherit: this.prop.compositeview,
        inherit_isEmpty: _.isEmpty(this.prop.compositeview),
        inherit_classify: _.chain(this.prop.compositeview + 'CompositeView').camelCase().capitalize()
      }
    );
  }
});
