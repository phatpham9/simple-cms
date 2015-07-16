module.exports = function(grunt) {
    grunt.config.set('htmlmin', {
        options: {
            removeComments: true,
            collapseWhitespace: true
        },
        public: {
            files: [{
                expand: true,
                cwd: 'public',
                src: '**/*.html',
                dest: 'public'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
};
