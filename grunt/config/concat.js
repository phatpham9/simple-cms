/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * public/shared/scripts or public/shared/styles directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {
	grunt.config.set('concat', {
		jsAdmin: {
			src: require('../pipeline/admin').jsFilesToInject,
			dest: 'public/shared/scripts/admin.concat.js'
		},
		cssAdmin: {
			src: require('../pipeline/admin').cssFilesToInject,
			dest: 'public/shared/styles/admin.concat.css'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};
