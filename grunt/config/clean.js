/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the public/shared of your
 * sails project.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function(grunt) {
	grunt.config.set('clean', {
		dev: [
            'public/*',
        ],
        prod: [
            'public/shared/scripts/*',
            '!public/shared/scripts/admin.min.js',
            '!public/shared/scripts/index.html',

            'public/shared/styles/*',
            '!public/shared/styles/admin.min.css',
            '!public/shared/styles/index.html'
        ]
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
};
