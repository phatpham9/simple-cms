/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {
	grunt.config.set('uglify', {
        options: {
            preserveComments: false
        },
        vendor: {
            files: {
                'public/shared/scripts/admin.min.js': 'public/shared/scripts/admin.concat.js'
            }
        },
        public: {
            files: [{
                expand: true,
                cwd: 'public',
                src: ['**/*.js', '!shared/**'],
                dest: 'public'
            }]
        }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
};
