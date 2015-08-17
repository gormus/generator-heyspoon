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
      desc: 'CollectionView name'
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
        'Create a ' + chalk.red('CollectionView') + '!' +
        ' You can also inherit an ItemView or a Collection. And create them if you want.'
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
        message: 'CollectionView Name [scripts/views/collection/COLLECTIONVIEW-NAME]',
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
        name: 'collectionview',
        message: 'Inherit another CollectionView? [scripts/views/collection/COLLECTIONVIEW-NAME]',
        filter: _.kebabCase,
        when: function () {
          return !prop.silent;
        }
      },
      {
        type: 'confirm',
        name: 'create_collectionview',
        message: 'Create inherited CollectionView?',
        default: false,
        when: function (answers) {
          return !prop.silent && (answers.collectionview !== '');
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
      }
    ];

    this.prompt(prompts, function (answers) {
      this.prop.name                  = prop.name || answers.name;
      this.prop.itemview              = prop.itemview || answers.itemview;
      this.prop.create_itemview       = answers.create_itemview || false;
      this.prop.collectionview        = prop.collectionview || answers.collectionview;
      this.prop.create_collectionview = answers.create_collectionview || false;

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

    if (this.prop.create_collectionview) {
      this.composeWith('heyspoon:collectionview', { options: {
        name: this.prop.collectionview,
        silent: true
      }});
    }

    this.fs.copyTpl(
      this.templatePath('collectionview.js'),
      this.destinationPath(path.join('app/scripts/views/collection', this.prop.name + '.js')),
      {
        name: this.prop.name,
        name_classify: _.chain(this.prop.name).camelCase().capitalize(),
        itemview: this.prop.itemview,
        itemview_isEmpty: _.isEmpty(this.prop.itemview),
        itemview_classify: _.chain(this.prop.itemview + 'ItemView').camelCase().capitalize(),
        inherit: this.prop.collectionview,
        inherit_isEmpty: _.isEmpty(this.prop.collectionview),
        inherit_classify: _.chain(this.prop.collectionview + 'CollectionView').camelCase().capitalize()
      }
    );
  }
});
