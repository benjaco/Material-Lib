module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        uglify: {
            build: {
                options: {
                    beautify: true
                },
                src: 'js/*.js',
                dest: 'dist/material.min.js'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/material.min.css': "style/*.css"
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin']);

};