module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            dev: {
                files: {
                    'public/js/app.js': 'public/js/src/app.js'
                },
                options: {
                    keepAlive: true,
                    watch: true
                }
            }
        },
        concurrent: {
            dev: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: ['nodemon', 'browserify:dev', 'watch:less', 'watch:livereload']
            }
        },
        less: {
            dev: {
                options: {
                    dumpLineNumbers: 'comments'
                },
                files: {
                    'public/css/main.css': ['public/css/less/main.less']
                }
            }
        },
        watch: {
            less: {
                files: ['public/css/less/**/*.less'],
                tasks: ['less:dev']
            },
            livereload: {
                files: ['public/css/main.css', 'public/js/app.js', 'public/index.html'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('nodemon', function () {
        var done = this.async();

        grunt.util.spawn({
            cmd: 'nodemon',
            args: ['index.js'],
            opts: {
                stdio: 'inherit'
            }
        }, function (error, response, code) {
            done();
        });
    });
};
