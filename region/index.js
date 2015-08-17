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
      desc: 'Region name'
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
        'Create a ' + chalk.red('Region') + '!' +
        ' You can also inherit another Region. And create them if you want.'
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
        message: 'Region Name [scripts/regions/REGION-NAME]',
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
        name: 'region',
        message: 'Inherit another Region? [scripts/regions/REGION-NAME]',
        filter: _.kebabCase,
        when: function () {
          return !prop.silent;
        }
      },
      {
        type: 'confirm',
        name: 'create_region',
        message: 'Create inherited Region?',
        default: false,
        when: function (answers) {
          return !prop.silent && (answers.region !== '');
        }
      }
    ];

    this.prompt(prompts, function (answers) {
      this.prop.name          = prop.name || answers.name;
      this.prop.region        = prop.region || answers.region;
      this.prop.create_region = answers.create_region || false;

      // this.log('Answers');
      // this.log(this.prop);

      done();
    }.bind(this));
  },

  // Step 4.
  writing: function () {
    if (this.prop.create_region) {
      this.composeWith('heyspoon:region', { options: {
        name: this.prop.region,
        silent: true
      }});
    }

    this.fs.copyTpl(
      this.templatePath('region.js'),
      this.destinationPath(path.join('app/scripts/regions', this.prop.name + '.js')),
      {
        name: this.prop.name,
        name_classify: _.chain(this.prop.name).camelCase().capitalize(),
        inherit: this.prop.region,
        inherit_isEmpty: _.isEmpty(this.prop.region),
        inherit_classify: _.chain(this.prop.region + 'Region').camelCase().capitalize()
      }
    );
  }
});
