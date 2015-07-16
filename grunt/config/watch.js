/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function(grunt) {
	grunt.config.set('watch', {
        public: {
            files: ['private/**/*'],
            tasks: ['sync', 'linkAssets']
        },
        pipeline: {
            files: ['grunt/config/sails-linker.js', 'grunt/pipeline/*'],
            tasks: ['linkAssets']
        },
        copy: {
            files: ['grunt/config/copy.js'],
            tasks: ['compileAssets', 'linkAssets']
        }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
