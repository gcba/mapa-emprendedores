'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                files: {
                    'public/stylesheets/style.css' : 'public/stylesheets/style.scss'
                }
            }
        },

        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            options: {
                livereload: true
            }
        },
        
        cssmin: {
            css:{
                src: 'public/stylesheets/style.css',
                dest: 'public/stylesheets/style.min.css'
            }
        }

    });


    //Register modules to user    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //Register tasks
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('deploy', ['cssmin']);
};