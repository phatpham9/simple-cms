/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the
 * app folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {
	grunt.config.set('copy', {
		dev: {
            files: [
            // angular apps
            {
                expand: true,
                cwd: './client',
                src: ['**/*.!(coffee|less)'],
                dest: 'public'
            },
            // vendors
            {
                expand: true,
                cwd: './bower_components',
                src: [
                    'jquery/dist/jquery.js',
                    'angular/angular.js',
                    'angular-sanitize/angular-sanitize.js',
                    'textAngular/dist/textAngular-rangy.min.js',
                    'textAngular/dist/textAngular-sanitize.min.js',
                    'textAngular/dist/textAngular.min.js',
                    'ng-tags-input/ng-tags-input.js',
                    'oclazyload/dist/ocLazyLoad.js',
                    'angular-bootstrap/ui-bootstrap.js',
                    'angular-bootstrap/ui-bootstrap-tpls.js',
                    'angular-cookies/angular-cookies.js',
                    'angular-resource/angular-resource.js',
                    'angular-ui-router/release/angular-ui-router.js',
                    'ngprogress/build/ngProgress.js'
                ],
                flatten: true,
                dest: 'public/shared/scripts'
            },
            // styles
            {
        		expand: true,
                cwd: './bower_components',
                src: [
                    'font-awesome/css/font-awesome.min.css',
                    'font-awesome/css/font-awesome.css.map',
                	'bootstrap/dist/css/bootstrap.min.css',
                	'normalize.css/normalize.css',
                    'textAngular/dist/textAngular.css',
                    'ng-tags-input/ng-tags-input.css',
                    'ng-tags-input/ng-tags-input.bootstrap.css'
                ],
                flatten: true,
                dest: 'public/shared/styles'
        	},
            // fonts
            {
        		expand: true,
                cwd: './bower_components',
                src: [
                	'bootstrap/dist/fonts/*',
                    'font-awesome/fonts/*'
                ],
                flatten: true,
                dest: 'public/shared/fonts'
        	}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
