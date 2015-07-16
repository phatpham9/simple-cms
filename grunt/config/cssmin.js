/**
 * Compress CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minifies css files and places them into public/min directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-cssmin
 */
module.exports = function(grunt) {
	grunt.config.set('cssmin', {
		options: {
            keepSpecialComments: 0
        },
        vendor: {
			files: {
                'public/shared/styles/admin.min.css': 'public/shared/styles/admin.concat.css'
            }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
};
