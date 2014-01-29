/*global exports:true, module:true, require:true */

// Modules & variables.
var nconf = require('nconf'),
        config = require('./config');

// Grunt.
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Cleans out directories.
        clean: {
            dev: [
                'www/modules',
                'www/docs',
                'www/'
            ],
            prod: [
                'www/modules',
                'www/docs',
                'www/'
            ]
        },
        // Copies assests.
        copy: {
            prod: {
                files: [
                    {
                        src: ['**'],
                        dest: 'www/data/',
                        expand: true,
                        cwd: 'src/data/'
                    },
                    {
                        src: ['**'],
                        dest: 'www/images/',
                        expand: true,
                        cwd: 'src/images/'
                    },
                    
                    {
                        src: ['*.min.js'],
                        dest: 'www/js/',
                        expand: true,
                        cwd: 'src/js/'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        src: ['**'],
                        dest: 'www/data/',
                        expand: true,
                        cwd: 'src/data/'
                    },
                    {
                        src: ['**'],
                        dest: 'www/images/',
                        expand: true,
                        cwd: 'src/images/'
                    },
                    
                    {
                        src: ['**'],
                        dest: 'www/js/',
                        expand: true,
                        cwd: 'src/js/'
                    }
                ]
            }
        },
        // Compile less files into css.
        less: {
            dev: {
                files: {
                    'www/css/umobile.css': 'src/less/umobile.less',
                    'www/css/module.css': 'src/less/module.less'
                }
            },
            prod: {
                files: {
                    'www/css/umobile.css': 'src/less/umobile.less',
                    'www/css/module.css': 'src/less/module.less'
                },
                options: {
                    compress: true
                }
            }
        },
        // Lint settings.
        jshint: {
            options: {
                nomen: false,
                curly: true,
                camelcase: true,
                eqeqeq: true,
                newcap: true,
                undef: true,
                trailing: true,
                strict: true,
                latedef: true,
                indent: false,
                quotmark: true
            },
            global: {
                define: true,
                window: true,
                document: true
            },
            all: [
                'src/js/src/**/*.js',
                'config/*.js',
                'tasks/*.js',
                '*.js'
            ]
        },
        // Compress javascript and copy to www directory.
        uglify: {
            options: {
                compress: false,
                mangle: false,
                preserveComments: false
            },
            lib: {
                files: {
                    'www/js/lib/jquery/jquery.min.js': ['src/js/lib/jquery/jquery.js'],
                    'www/js/lib/jquery/jquery-pubsub.min.js': ['src/js/lib/jquery/jquery-pubsub.js'],
                    'www/js/lib/gibberish/gibberishAES.min.js': ['src/js/lib/gibberish/gibberishAES.js'],
                    'www/js/lib/underscore/underscore.min.js': ['src/js/lib/underscore/underscore.js'],
                    'www/js/lib/backbone/backbone.min.js': ['src/js/lib/backbone/backbone.js'],
                    'www/js/lib/backbone/backbone-super.min.js': ['src/js/lib/backbone/backbone-super.js'],
                    'www/js/lib/backbone/backbone-validation.min.js': ['src/js/lib/backbone/backbone-validation.js'],
                    'www/js/lib/handlebars/handlebars.min.js': ['src/js/lib/handlebars/handlebars.js'],
                    'www/js/lib/bootstrap/bootstrap.min.js': ['src/js/lib/bootstrap/bootstrap.js'],
                    'www/js/lib/debug/debug.min.js': ['src/js/lib/debug/debug.js']
                }
            },
            source: {
                files: {
                    'www/js/src/main.min.js': [
                        'src/js/src/config/' + config.getAuth() + '.js',
                        'src/js/src/app.js',
                        'src/js/src/service/Utils.js',
                        'src/js/src/service/' + config.getTracker() + '.js',
                        'src/js/src/service/Authentication.js',
                        'src/js/src/service/Storage.js',
                        'src/js/src/model/State.js',
                        'src/js/src/model/Module.js',
                        'src/js/src/model/Credential.js',
                        'src/js/src/model/Notifier.js',
                        'src/js/src/collection/ModuleCollection.js',
                        'src/js/src/view/ViewManager.js',
                        'src/js/src/view/Base.js',
                        'src/js/src/view/Background.js',
                        'src/js/src/view/Page.js',
                        'src/js/src/view/Breadcrumb.js',
                        'src/js/src/view/Header.js',
                        'src/js/src/view/Footer.js',
                        'src/js/src/view/LoadedView.js',
                        'src/js/src/view/DashboardView.js',
                        'src/js/src/view/LoginView.js',
                        'src/js/src/view/Module.js',
                        'src/js/src/view/ModuleView.js',
                        'src/js/src/view/Notifier.js',
                        'src/js/src/router.js'
                    ]
                }
            }
        },
        // Compile html files and copy to target directories.
        compilehtml: {
            devViews: {
                options: {
                    tracker: config.getTracker(),
                    auth: config.getAuth(),
                    dev: true
                },
                src: 'views/*.html',
                dest: 'www/FILE.html'
            },
            devModules: {
                options: {
                    tracker: config.getTracker(),
                    auth: config.getAuth(),
                    dev: true
                },
                src: 'views/modules/*.html',
                dest: 'www/modules/FILE.html'
            },
            prodViews: {
                options: {
                    tracker: config.getTracker(),
                    auth: config.getAuth(),
                    dev: false
                },
                src: 'views/*.html',
                dest: 'www/FILE.html'
            },
            prodModules: {
                options: {
                    tracker: config.getTracker(),
                    auth: config.getAuth(),
                    dev: false
                },
                src: 'views/modules/*.html',
                dest: 'www/modules/FILE.html'
            }
        },
        // Append script-based templates to index file.
        appendpartials: {
            options: {
                tag: 'script',
                type: 'text/x-handlebars-template'
            },
            dev: {
                options: {
                    layout: 'www/index.html'
                },
                files: {
                    'www/index.html': ['views/partials/*.html']
                }
            },
            prod: {
                options: {
                    layout: 'www/index.html'
                },
                files: {
                    'www/index.html': ['views/partials/*.html']
                }
            }
        },
        yuidoc: {
            dev: {
                name: '<%= pkg.name %>',
                options: {
                    paths: 'src/js/src/',
                    outdir: 'www/docs/'
                }
            },
            prod: {
                name: '<%= pkg.name %>',
                options: {
                    paths: 'src/js/src/',
                    outdir: 'www/docs/'
                }
            }
        },
        watch: {
            dev: {
                files: [
                    'views/*.html',
                    'views/modules/*.html',
                    'views/partials/*.html',
                    'src/less/**'
                ],
                tasks: [
                    'compilehtml:devViews',
                    'compilehtml:devModules',
                    'appendpartials:dev',
                    'less:dev'
                ]
            }
        },
        phonegap: {
            config: {
                root: 'www',
                config: 'src/config.xml',
                cordova: '.cordova',
                path: 'phonegap',
                plugins: config.plugins,
                platforms: config.platforms,
                maxBuffer: 400, // You may need to raise this for iOS.
                verbose: false,
                releases: 'releases',
                releaseName: function() {
                    var pkg = grunt.file.readJSON('package.json');
                    return(pkg.name + '-' + pkg.version);
                },
                // Add a key if you plan to use the `release:android` task
                // See http://developer.android.com/tools/publishing/app-signing.html
                key: {
                    store: 'release.keystore',
                    alias: 'release',
                    aliasPassword: function() {
                        // Prompt, read an environment variable, or just embed as a string literal
                        return('');
                    },
                    storePassword: function() {
                        // Prompt, read an environment variable, or just embed as a string literal
                        return('');
                    }
                },
                // Set an app icon at various sizes (optional)
                /*
                 icon: {
                 ldpi: 'icon-36-ldpi.png',
                 mdpi: 'icon-48-mdpi.png',
                 hdpi: 'icon-72-hdpi.png',
                 xhdpi: 'icon-96-xhdpi.png'
                 },
                 */
                // Android-only integer version to increase with each release.
                // See http://developer.android.com/tools/publishing/versioning.html
                versionCode: function() {
                    return(1);
                }
            }
        }


    });

    // Load plugins/tasks.
    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-phonegap');
    grunt.task.loadTasks('tasks');

    // Register tasks.

    // Template watch command. Listens for changes
    // to templates and outputs changes to the /src
    // directory.
    grunt.registerTask('watcher', ['watch:dev']);

    // Documentation command. Outputs documentation
    // to /docs.
    grunt.registerTask('docs', ['yuidoc']);

    // Build command for development code.
    // Pushes code to /src directory.
    grunt.registerTask('dev', [
        'clean:dev',
        'copy:dev',
        'less:dev',
        'jshint',
        'compilehtml:devViews',
        'compilehtml:devModules',
        'appendpartials:dev',
        'yuidoc:dev'
    ]);

    // Build command for production-ready code.
    // Pushes code to /www directory.
    grunt.registerTask('prod', [
        'clean:prod',
        'copy:prod',
        'less:prod',
        'jshint',
        'uglify',
        'compilehtml:prodViews',
        'compilehtml:prodModules',
        'appendpartials:prod',
        'yuidoc:prod'
    ]);


    grunt.registerTask('build', [
        'phonegap:build'
    ]);
    
    grunt.registerTask('build.dev', [
        'dev',
        'phonegap:build'
    ]);

    grunt.registerTask('build.prod', [
        'prod',
        'phonegap:build'
    ]);
    
    grunt.registerTask('run', [
        'phonegap:run'
    ]);

    grunt.registerTask('run.dev', [
        'build.dev',
        'phonegap:run'
    ]);
    
    grunt.registerTask('run.prod', [
        'build.prod',
        'phonegap:run'
    ]);
    
    grunt.registerTask('default', ['run.dev']);

};