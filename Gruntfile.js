module.exports = function (grunt) {
    'use strict';
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    var configFile = grunt.option('config') || 'config.json',
        config = grunt.file.readJSON(configFile);

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'app/js/app.js'
            ]
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                  },
                  files: {
                    'build/css/main.min.css': 'build/css/main.scss'
                  }
            }
        },
        uglify: {
            dist: {
                options: {
                  compress: {
                    drop_console: true
                  },
                  wrap: true
                },
                files: {
                    'build/js/app.min.js': ['build/js/app.js']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeComments: true
                },
                files: {
                    'build/index.html': 'build/index.html'
                }
            }
        },
        // copy just moves images into build/
        // CSS & scripts are inlined in HTML before this step
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'app',
                    dest: 'build',
                    src: ['img/*.{png,jpg,jpeg,gif,ico}']
                }]
            }
        },
        'string-replace': {
            // swaps out template strings (e.g. {{prefix}})
            // with values in config.json
            // moves CSS, JS, HTML => build/
            tpl: {
                files: {
                    'build/js/app.js': 'app/js/app.js',
                    'build/css/main.scss': 'app/css/main.scss',
                    'build/css/_vars.scss': 'app/css/_vars.scss',
                    'build/index.html': 'app/index.html'
                },
                options: {
                    replacements: [{
                        pattern: /\{\{prefix\}\}/i,
                        replacement: config.prefix
                    }, {
                        pattern: /\{\{largeImageUrl\}\}/i,
                        replacement: config.largeImageUrl
                    }, {
                        pattern: /\{\{smallImageUrl\}\}/i,
                        replacement: config.smallImageUrl
                    }, {
                        pattern: /\{\{link\[(\d)\]\.([a-z0-9]*)\}\}/ig,
                        replacement: function (match, p1, p2) {
                            if (config.links[p1]) {
                                return config.links[p1][p2];
                            }
                        }
                    }]
                }
            },
            // inline app.js & main.css
            // runs AFTER tpl, SASS, & Uglify tasks
            inline: {
                files: {
                    'build/index.html': 'build/index.html'
                },
                options: {
                    replacements: [{
                        pattern: '<script src="js/app.js"></script>',
                        replacement: '<script><%= grunt.file.read("build/js/app.min.js") %></script>'
                    }, {
                        pattern: '<style>@import url(css/main.css);</style>',
                        replacement: '<style><%= grunt.file.read("build/css/main.min.css") %></style>'
                    }]
                }
            }
        },
        clean: {
            dist: {
                src: ['build']
            }
        },
        watch: {
            dist: {
                files: ['app/**'],
                tasks: ['build']
            }
        }
    });

    grunt.registerTask('lint', [
        'jshint'
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'string-replace:tpl',
        'uglify',
        'sass',
        'string-replace:inline',
        'htmlmin'
    ]);

    // @todo serve task
};
