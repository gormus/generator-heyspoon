// Generated on <%= (new Date).toISOString().split('T')[0] %> using
// <%= app_name %> - v<%= app_version %>

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt, {scope: ['devDependencies', 'dependencies']});
  require('time-grunt')(grunt);

  var directories = {
    // Application and Distribution roots.
    app: { root: 'app' },
    dist: { root: 'build' },

    // Path to Bower. i.e. app/bower_components
    vendor: grunt.file.readJSON('.bowerrc').directory
  };

  /**
   * Application and Distribution asset paths.
   *
   * Folder names and their descriptions.
   *  - js:
   *    Processed JavaScript files automatically copied into this directory.
   *    Do not modify the files in this directory, since they will be overwritten.
   *
   *  - scripts
   *    Unprocessed JavaScript files should be kep in this directory.
   *    Do not reference to these files from the HTML.
   *
   *  - css
   *    Processed Style Sheet files automatically copied into this directory.
   *    In HTML, reference to these CSS files in this directory.
   *    Do not modify the files in this directory, since they will be overwritten.
   *
   *  - fonts
   *    All webfonts should be placed in this directory.
   *    Content of this directory processed and copied to distribution.
   *
   *  - images
   *    All images should be placed in this directory.
   *    Content of this directory processed and copied to distribution.
   *
   *  - tpl
   *    All JavaScript templates should be placed in this directory.
   *    Content of this directory processed and converted to JavaScript.
   */
  directories.app.js = directories.app.root + '/js';
  directories.app.scripts = directories.app.root + '/scripts';
  directories.app.css = directories.app.root + '/css';
  directories.app.styles = directories.app.root + '/styles';
  directories.app.fonts = directories.app.root + '/fonts';
  directories.app.images = directories.app.root + '/images';
  directories.app.icons = directories.app.root + '/icons';
  directories.app.tpl = directories.app.root + '/templates';

  directories.dist.js = directories.dist.root + '/js';
  directories.dist.css = directories.dist.root + '/css';
  directories.dist.fonts = directories.dist.root + '/fonts';
  directories.dist.images = directories.dist.root + '/images';
  directories.dist.icons = directories.dist.root + '/icons';
  directories.dist.tpl = directories.dist.root + '/templates';

  grunt.initConfig({
    dir: directories,
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Watch tasks.
     */
    watch: {
      bower: {
        options: {
          reload: true
        },
        files: ['bower.json']
      },
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js'],
        tasks: ['jshint']
      },
      styles: {
        files: ['<%%= dir.app.styles %>/{,*/}*.{scss,sass}'],
        tasks: ['sass', 'postcss']
      },
      html: {
        files: ['<%%= dir.app.root %>/**/*.html']
      },
      handlebars: {
        files: ['<%%= dir.app.tpl %>/**/*.hbs'],
        tasks: ['handlebars']
      },
      icons: {
        files: ['<%%= dir.app.icons %>/{,*/}*.{ico,png,svg,xml,json}'],
        tasks: ['newer:imagemin']
      },
      images: {
        files: ['<%%= dir.app.images %>/{,*/}*.{gif,jpeg,jpg,png}'],
        tasks: ['newer:imagemin']
      },
      svgImages: {
        files: ['<%%= dir.app.images %>/{,*/}*.svg'],
        tasks: ['newer:svgmin']
      },
      webfonts: {
        files: ['<%%= dir.app.fonts %>/{,*/}*.{eot,svg,ttf,woff,woff2}']
      },
      js: {
        files: ['<%%= dir.app.scripts %>/{,*/}*.js'],
        tasks: ['jshint']
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      }
    },

    clean: {
      options: {
        dot: true
      },
      dist: {
        src: [
          '.tmp',
          '<%%= dir.app.css %>',
          '<%%= dir.app.js %>/*.*',
          '!<%%= dir.app.js %>/vendor/*.*',
          '<%%= dir.dist.root %>',
          '!<%%= dir.vendor %>/*',
          '!<%%= dir.dist.root %>/.git*'
        ]
      }
    },

    sass: {
      options: {
        sourceMap: false,
        sourceComments: true,
        outputStyle: 'expanded', // nested, expanded, compact, compressed
        precision: 8,
        includePaths: [
          '.'<% if (includeBootstrap) { %>,
          '<%%= dir.vendor %>/bootstrap-sass/assets/stylesheets'
          <% } else if (includeFoundation) { %>,
          '<%%= dir.vendor %>/foundation/scss'
          <% } %>
        ]
      },
      main: {
        files: [{
          expand: true,
          cwd: '<%%= dir.app.styles %>',
          src: ['*.{scss,sass}'],
          dest: '<%%= dir.app.css %>',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          // Add vendor prefixed styles.
          require('autoprefixer-core')({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
          })
        ]
      },
      dist: {
        src: '<%%= dir.app.css %>/{,*/}*.css'
      }
    },

    copy: {
      options: {
        dot: true
      },
      generated: {
        files: [
          {
            expand: true,
            cwd: '<%%= dir.app.root %>/',
            src: [
              '{,*/}*.{html,htm,config,xml}',
              '.htaccess',
              '!manifest.appcache'
            ],
            dest: '<%%= dir.dist.root %>/'
          },
          {
            expand: true,
            cwd: '<%%= dir.app.css %>/',
            src: ['{,*/}*.{css,map}'],
            dest: '<%%= dir.dist.css %>/'
          },
          {
            expand: true,
            cwd: '<%%= dir.app.js %>/',
            src: ['{,*/}*.{js,map}'],
            dest: '<%%= dir.dist.js %>/'
          },
          {
            expand: true,
            cwd: '<%%= dir.app.fonts %>/',
            src: ['{,*/}*.{eot,svg,ttf,woff,woff2}'],
            dest: '<%%= dir.dist.fonts %>/'
          }
        ]
      }
    },

    uglify: {
      generated: {
        options: {
          preserveComments: true,
          banner: '/*! <%%= grunt.template.today("yyyy-mm-dd") %> */'
        }
      },
      dist: {
        options: {
          preserveComments: false,
          banner: '/*! <%%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: [{
          expand: true,
          cwd: '<%%= dir.dist.js %>/',
          src: ['**/*.js'],
          dest: '<%%= dir.dist.js %>/'
        }]
      }
    },

    browserSync: {
      options: {
        open: 'local', // local, external, ui, ui-external, tunnel or false
        ui: {
          port: 9000
        },
        ghostMode: {
          clicks: true,
          forms: true,
          scroll: true
        },
        scrollProportionally: true,
        injectChanges: true,
        notify: true,
        watchTask: true,
        port: 3000
      },
      app: {
        bsFiles: {
          src: [
            '<%%= dir.app.root %>/{,*/}*.html',
            '<%%= dir.app.css %>/{,*/}*.css',
            '<%%= dir.app.js %>/{,*/}*.js',
            '<%%= dir.app.images %>/{,*/}*.{gif,jpeg,jpg,png,svg}',
            '<%%= dir.app.icons %>/{,*/}*.{ico,png,svg,xml,json}',
            '<%%= dir.app.fonts %>/{,*/}*.{eot,svg,ttf,woff,woff2}'
          ]
        },
        options: {
          server: {
            baseDir: './<%%= dir.app.root %>'
          }
        }
      },
      dist: {
        bsFiles: {
          src: [
            '<%%= dir.dist.root %>/{,*/}*.html',
            '<%%= dir.dist.css %>/{,*/}*.css',
            '<%%= dir.dist.js %>/{,*/}*.js',
            '<%%= dir.dist.images %>/{,*/}*.{gif,jpeg,jpg,png,svg}',
            '<%%= dir.dist.icons %>/{,*/}*.{ico,png,svg,xml,json}',
            '<%%= dir.dist.fonts %>/{,*/}*.{eot,svg,ttf,woff,woff2}'
          ]
        },
        options: {
          server: {
            baseDir: './<%%= dir.dist.root %>'
          }
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= dir.app.images %>/',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%%= dir.dist.images %>/'
        },
        {
          expand: true,
          cwd: '<%%= dir.app.icons %>/',
          src: '{,*/}*.{gif,jpeg,jpg,png,xml,json}',
          dest: '<%%= dir.dist.icons %>/'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= dir.app.images %>/',
          src: '{,*/}*.svg',
          dest: '<%%= dir.dist.images %>/'
        }]
      }
    },

    useminPrepare: {
      html: '<%%= dir.dist.root %>/index.html',
      options: {
        dest: '<%%= dir.dist.root %>'
      }
    },

    filerev: {
      options: {
        algorithm: 'md5',
        length: 6
      },
      source: {
        files: [{
          src: [
            '<%%= dir.dist.js %>/{,*/}*.js',
            '<%%= dir.dist.css %>/{,*/}*.css',
            '<%%= dir.dist.images %>/{,*/}*.{gif,jpeg,jpg,png,svg}',
            '<%%= dir.dist.fonts %>/{,*/}*.{eot,svg,ttf,woff,woff2}'
          ]
        }]
      }
    },

    usemin: {
      options: {
        assetsDirs: [
          '<%%= dir.dist.root %>',
          '<%%= dir.dist.css %>',
          '<%%= dir.dist.js %>',
          '<%%= dir.dist.images %>',
          '<%%= dir.dist.fonts %>'
        ]
      },
      html: ['<%%= dir.dist.root %>/{,*/}*.html'],
      css: ['<%%= dir.dist.css %>/{,*/}*.css']
    },

    <% if (includeModernizr) { %>
    /**
     * Generates a custom Modernizr build that includes only the tests you
     * reference in your app.
     *
     * @see https://github.com/Modernizr/grunt-modernizr#readme
     */
    modernizr: {
      app: {
        devFile: '<%%= dir.vendor %>/modernizr/modernizr.js',
        outputFile: '<%%= dir.app.js %>/vendor/modernizr.js',
        extra: {
          shiv: true,
          printshiv: true,
          load: true,
          mq: true,
          cssclasses: true
        },
        parseFiles: true,
        uglify: true,
        files: {
          src: [
            '.tmp/concat/scripts/{,*/}*.js',
            '.tmp/concat/css/{,*/}*.css',
            '!.tmp/concat/scripts/vendor/*',
            '<%%= dir.app.js %>/',
            '!<%%= dir.app.js %>/vendor/*'
          ]
        }
      }
    },
    <% } %>

    // @see options at https://github.com/kangax/html-minifier#options-quick-reference
    htmlmin: {
      dist: {
        options: {
          removeComments: true, // true
          removeCommentsFromCDATA: false,
          removeCDATASectionsFromCDATA: false,
          collapseWhitespace: true, // true
          conservativeCollapse: true,
          preserveLineBreaks: true,
          collapseBooleanAttributes: false,
          removeAttributeQuotes: false,
          removeRedundantAttributes: false,
          preventAttributesEscaping: false,
          useShortDoctype: true,
          removeEmptyAttributes: false,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeOptionalTags: false,
          removeIgnored: true,
          removeEmptyElements: false,
          lint: false,
          keepClosingSlash: true,
          caseSensitive: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: false
        },
        files: [{
          expand: true,
          cwd: '<%%= dir.dist.root %>/',
          src: ['*.html'],
          dest: '<%%= dir.dist.root %>/'
        }]
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: false, // Default: 'JST'
          amd: true
        },
        files: {
          '<%%= dir.app.js %>/templates.js': ['<%%= dir.app.tpl %>/**/*.hbs']
        }
      }
    },

    requirejs: {
      app: {
        options: {
          baseUrl: '<%%= dir.app.scripts %>',
          include: ['init.js'],
          mainConfigFile: '<%%= dir.app.scripts %>/mainConfig.js',
          out: '<%%= dir.app.js %>/app.js',
          optimize: 'none',
          removeCombined: false,
          generateSourceMaps: false,
          preserveLicenseComments: false,
          useStrict: true,
          wrapShim: true
        }
      }
    },

    removelogging: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= dir.dist.js %>/',
          src: ['*.js', '!vendor/**/*.js'],
          dest: '<%%= dir.dist.js %>/'
        }]
      }
    },

    manifest: {
      generate: {
        options: {
          basePath: '<%%= dir.dist.root %>',
          network: [
            '//www.google-analytics.com'
          ],
          cache: [
            'crossdomain.xml'
          ],
          fallback: ['/ /offline.html'],
          preferOnline: true,
          verbose: false,
          timestamp: true
        },
        src: [
          '**/*.html',
          'js/**/*.js',
          'css/**/*.css',
          'images/{,*/}*.{gif,jpeg,jpg,png,svg}',
          'icons/{,*/}*.{gif,jpeg,jpg,png,xml,json}',
          'fonts/{,*/}*.{eot,svg,ttf,woff,woff2}'
        ],
        dest: '<%%= dir.dist.root %>/manifest.appcache'
      }
    },

    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      target: [
        'Gruntfile.js',
        '<%%= dir.app.scripts %>/{,*/}*.js',
        '!<%%= dir.app.scripts %>/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    }
  });

  grunt.registerTask('default', [
    'clean',
    'build'
  ]);

  grunt.registerTask('serve', 'start the server and preview your app', function (target) {
    if (target === 'dist') {
      grunt.task.run(['clean', 'build:dist', 'browserSync:dist', 'watch']);
    }
    else {
      grunt.task.run(['clean', 'build', 'browserSync:app', 'watch']);
    }
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('build', 'Build all the components.', function (target) {
    grunt.task.run([
      'jshint',
      'handlebars',
      'sass',
      'postcss',
      'requirejs'<% if (includeModernizr) { %>,
      'modernizr'<% } %>
    ]);

    if (target === 'dist') {
      // Additional tasks for distribution.
      grunt.task.run([
        'imagemin',
        'svgmin',
        'useminPrepare',
        'copy:generated',
        'uglify:generated',
        'requirejs',
        'removelogging',
        'filerev',
        'usemin',
        'htmlmin',
        'uglify:dist',
        'manifest'
      ]);
    }
  });
};
