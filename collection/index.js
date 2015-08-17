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
      desc: 'Collection name'
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
        'Create a ' + chalk.red('Collection') + '!' +
        'You can also inherit a model or a collection. And create them if you want.'
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
        message: 'Collection Name [scripts/collections/COLLECTION-NAME]',
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
        name: 'collection',
        message: 'Inherit another collection? [scripts/collections/COLLECTION-NAME]',
        filter: _.kebabCase,
        when: function () {
          return !prop.silent;
        }
      },
      {
        type: 'confirm',
        name: 'create_collection',
        message: 'Create inherited collection?',
        default: false,
        when: function (answers) {
          return !prop.silent && (answers.collection !== '');
        }
      },
      {
        type: 'input',
        name: 'model',
        message: 'Inherit a model? [scripts/models/MODEL-NAME]',
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
      },
    ];

    this.prompt(prompts, function (answers) {
      this.prop.name              = prop.name || answers.name;
      this.prop.model             = prop.model || answers.model;
      this.prop.create_model      = answers.create_model || false;
      this.prop.collection        = prop.collection || answers.collection;
      this.prop.create_collection = answers.create_collection || false;

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

    if (this.prop.create_collection) {
      this.composeWith('heyspoon:collection', { options: {
        name: this.prop.collection,
        silent: true
      }});
    }

    this.fs.copyTpl(
      this.templatePath('collection.js'),
      this.destinationPath(path.join('app/scripts/collections', this.prop.name + '.js')),
      {
        name: this.prop.name,
        name_classify: _.chain(this.prop.name).camelCase().capitalize(),
        model: this.prop.model,
        model_isEmpty: _.isEmpty(this.prop.model),
        model_classify: _.chain(this.prop.model + 'Model').camelCase().capitalize(),
        inherit: this.prop.collection,
        inherit_isEmpty: _.isEmpty(this.prop.collection),
        inherit_classify: _.chain(this.prop.collection + 'Collection').camelCase().capitalize()
      }
    );
  }
});
