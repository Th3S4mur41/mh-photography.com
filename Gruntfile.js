/* eslint-env node, grunt */
'use strict';

module.exports = function(grunt) {
	// *****************************************************************************************************************
	// Variables
	// *****************************************************************************************************************
	const sass = require('node-sass');

	// *****************************************************************************************************************
	// Load NPM Plugins
	// *****************************************************************************************************************
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-image-size-export');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-stylelint');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-terser');
	grunt.loadNpmTasks('gruntify-eslint');

	// *****************************************************************************************************************
	// Grunt config
	// *****************************************************************************************************************

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		buildnumber: grunt.option('build') || 'dev-' + Date.now(),
		clean: {
			options: {
				force: true
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'dist',
						src: ['**']
					}
				]
			}
		},
		copy: {
			build: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['src/index.html'],
						dest: 'build/',
						filter: 'isFile'
					}
				]
			},
			debug: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['src/favicon.ico'],
						dest: 'dist/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: true,
						src: ['src/manifest.webmanifest'],
						dest: 'dist/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: true,
						src: ['src/configconfig.json'],
						dest: 'dist/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: true,
						src: ['src/*.php'],
						dest: 'dist/',
						filter: 'isFile'
					},
					{
						expand: false,
						flatten: true,
						src: 'src/robots-debug.txt',
						dest: 'dist/robots.txt',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: false,
						cwd: 'src/',
						src: ['assets/icons/*', 'assets/videos/**/*'],
						dest: 'dist/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: false,
						cwd: 'src/',
						src: ['scripts/*'],
						dest: 'dist/src/',
						filter: 'isFile'
					}
				]
			},
			release: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['src/favicon.ico', 'src/robots.txt', 'src/sitemap.xml', 'src/manifest.webmanifest'],
						dest: 'dist/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: true,
						src: ['src/*.php'],
						dest: 'dist/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: false,
						cwd: 'src/',
						src: [
							'assets/icons/*',
							'assets/videos/**/*',
							'!assets/images/diashow/**/*',
							'!assets/images/portfolio/**/*'
						],
						dest: 'dist/',
						filter: 'isFile'
					}
				]
			}
		},
		eslint: {
			options: {
				allowInlineConfig: true,
				// configFile: '.eslintrc',
				maxWarnings: -1,
				useEslintrc: true
			},
			all: {
				src: ['src/scripts/**/*.js', '!src/scipts/**/*.min.js']
			}
		},
		htmlmin: {
			options: {
				collapseBooleanAttributes: true,
				collapseWhitespace: true,
				// removeAttributeQuotes:          true,
				// removeEmptyAttributes:          true,
				removeRedundantAttributes: true,
				// removeScriptTypeAttributes:     true,
				// removeStyleLinkTypeAttributes:  true,
				html5: true
			},
			debug: {
				files: {
					'dist/index.html': 'build/index.html'
				}
			},
			release: {
				options: {
					removeComments: true
				},
				files: {
					'dist/index.html': 'build/index.html'
				}
			}
		},
		imageSizeExport: {
			'category-1': {
				options: {
					path: 'src/assets/images/pictures/category-1/*.jpg',
					template: 'src/templates/pictures.hbs',
					output: 'build/pictures-1.html'
				}
			},
			'category-2': {
				options: {
					path: 'src/assets/images/pictures/category-2/*.jpg',
					template: 'src/templates/pictures.hbs',
					output: 'build/pictures-2.html'
				}
			},
			'category-3': {
				options: {
					path: 'src/assets/images/pictures/category-3/*.jpg',
					template: 'src/templates/pictures.hbs',
					output: 'build/pictures-3.html'
				}
			},
			'category-4': {
				options: {
					path: 'src/assets/images/pictures/category-4/*.jpg',
					template: 'src/templates/pictures.hbs',
					output: 'build/pictures-4.html'
				}
			},
			'category-5': {
				options: {
					path: 'src/assets/images/pictures/category-5/*.jpg',
					template: 'src/templates/pictures.hbs',
					output: 'build/pictures-5.html'
				}
			},
			'category-6': {
				options: {
					path: 'src/assets/images/pictures/category-6/*.jpg',
					template: 'src/templates/pictures.hbs',
					output: 'build/pictures-6.html'
				}
			}
		},
		postcss: {
			options: {
				processors: [
					require('autoprefixer')({
						flexbox: 'no-2009',
						grid: true
					})
				]
			},
			debug: {
				options: {
					map: true
				},
				src: 'dist/styles.css'
			},
			release: {
				src: 'dist/styles.css'
			}
		},
		replace: {
			build: {
				options: {
					patterns: [
						{
							match: /{{BUILD}}/g,
							replacement: '<%= buildnumber %>'
						},
						{
							match: /{{YEAR}}/g,
							replacement: new Date().getFullYear()
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: false,
						src: ['build/**/*.html', 'dist/**/*.css', 'dist/**/*.js'],
						dest: '.'
					}
				]
			},
			pictures: {
				options: {
					patterns: [
						{
							match: /{{PICTURES-1}}/g,
							replacement: "<%= grunt.file.read('build/pictures-1.html') %>"
						},
						{
							match: /{{PICTURES-2}}/g,
							replacement: "<%= grunt.file.read('build/pictures-2.html') %>"
						},
						{
							match: /{{PICTURES-3}}/g,
							replacement: "<%= grunt.file.read('build/pictures-3.html') %>"
						},
						{
							match: /{{PICTURES-4}}/g,
							replacement: "<%= grunt.file.read('build/pictures-4.html') %>"
						},
						{
							match: /{{PICTURES-5}}/g,
							replacement: "<%= grunt.file.read('build/pictures-5.html') %>"
						},
						{
							match: /{{PICTURES-6}}/g,
							replacement: "<%= grunt.file.read('build/pictures-6.html') %>"
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: false,
						src: ['build/**/*.html'],
						dest: '.'
					}
				]
			},
			path: {
				options: {
					patterns: [
						{
							match: /src\/assets\//g,
							replacement: 'assets/'
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: false,
						src: ['build/**/*.html'],
						dest: '.'
					}
				]
			},
			version: {
				options: {
					patterns: [
						{
							match: /\{{BUILD}}/g,
							replacement: '<%= pkg.version %>'
						}
					]
				},
				files: [
					{
						// src: [
						// 	'.htaccess'
						// ],
						// dest: 'dist/.htaccess'
					}
				]
			}
		},
		responsive_images: {
			options: {
				concurrency: 2
			},
			background: {
				options: {
					quality: 80,
					rename: false,
					sizes: [
						{
							suffix: '--w320',
							width: 320
						},
						{
							suffix: '--w640',
							width: 640
						},
						{
							suffix: '--w768',
							width: 768
						},
						{
							suffix: '--w1024',
							width: 1024
						},
						{
							suffix: '--w1366',
							width: 1366
						},
						{
							suffix: '--w1600',
							width: 1600
						},
						{
							suffix: '--w1920',
							width: 1920
						},
						{
							suffix: '--w2560',
							width: 2560
						},
						{
							suffix: '',
							width: 3840
						}
					]
				},
				files: [
					{
						expand: true,
						src: ['assets/images/layout/**.jpg', 'assets/images/pictures/*.jpg'],
						cwd: 'src/',
						dest: 'dist/'
					}
				]
			},
			pictures: {
				options: {
					quality: 80,
					rename: false,
					sizes: [
						{
							suffix: '--w320',
							width: 320
						},
						{
							suffix: '--w640',
							width: 640
						},
						{
							suffix: '--w768',
							width: 768
						},
						{
							suffix: '--w1024',
							width: 1024
						},
						{
							suffix: '--w1366',
							width: 1366
						},
						{
							suffix: '--w1600',
							width: 1600
						},
						{
							suffix: '--w1920',
							width: 1920
						},
						{
							suffix: '--w2560',
							width: 2560
						},
						{
							suffix: '',
							width: 3840
						}
					]
				},
				files: [
					{
						expand: true,
						src: ['assets/images/pictures/*/*.jpg'],
						cwd: 'src/',
						dest: 'dist/'
					}
				]
			}
		},
		sass: {
			options: {
				implementation: sass,
				outputStyle: 'compressed'
			},
			debug: {
				options: {
					sourceMap: true
				},
				files: {
					'dist/styles.css': 'src/styles/styles.scss'
				}
			},
			release: {
				options: {
					sourceMap: false
				},
				files: {
					'dist/styles.css': 'src/styles/styles.scss'
				}
			}
		},
		stylelint: {
			options: {
				configFile: '.stylelintrc',
				formatter: 'string',
				ignoreDisables: false,
				outputFile: 'reports/stylelint-report.json',
				reportNeedlessDisables: false,
				syntax: 'less'
			},
			all: {
				src: ['src/styles/**/*.scss', 'src/styles/**/*.sass', 'src/styles/**/*.css']
			}
		},
		terser: {
			options: {
				compress: true,
				mangle: true
				// wrap    : true
			},
			debug: {
				options: {
					sourceMap: {
						root: '.',
						url: 'app.js.map'
					}
					// sourceMapIncludeSources: true
					// sourceMapIn : 'scripts/scripts.js.map'
				},
				files: {
					'dist/app.js': ['src/scripts/**/*.js', '!src/scripts/worker.js', '!src/scripts/**/*.min.js'],
					'dist/worker.js': 'src/scripts/worker.js'
				}
			},
			release: {
				files: {
					'dist/app.js': ['src/scripts/**/*.js', '!src/scripts/worker.js', '!src/scripts/**/*.min.js'],
					'dist/worker.js': 'src/scripts/worker.js'
				}
			}
		},
		watch: {
			options: {
				spawn: true,
				interrupt: true,
				debounceDelay: 1000
			},
			styles: {
				files: ['src/styles/**/*'],
				tasks: ['sass:debug', 'postcss:debug']
			},
			// scripts: {
			// 	files: ['src/scripts/**/*.js'],
			// 	tasks: ['uglify:debug']
			// },
			typescript: {
				files: ['src/scripts/**/*.ts'],
				tasks: ['ts:debug']
			},
			html: {
				files: ['src/**/*.html'],
				tasks: ['htmlmin:debug']
			},
			assets: {
				files: ['src/assets/icons/**/*', 'src/assets/images/**/*'],
				tasks: ['copy:debug']
			}
		}
	});

	// *****************************************************************************************************************
	// Public tasks
	// *****************************************************************************************************************

	/**
	 * Check code for quality issues
	 */
	grunt.registerTask('check-code', ['eslint', 'stylelint']);

	/**
	 * Debug Build without image processing
	 */
	grunt.registerTask('debug-quick', [
		'copy:build',
		'imageSizeExport',
		'replace',
		'htmlmin:debug',
		'terser:debug',
		// 'ts:debug',
		'sass:debug',
		'postcss:debug',
		'copy:debug'
	]);

	/**
	 * Debug Build
	 */
	grunt.registerTask('debug', [
		'clean',
		'copy:build',
		'responsive_images',
		'imageSizeExport',
		'replace',
		'htmlmin:debug',
		'terser:debug',
		// 'ts:debug',
		'sass:debug',
		'postcss:debug',
		'copy:debug'
	]);

	/**
	 * Release Build
	 */
	grunt.registerTask('release', [
		'clean',
		'copy:build',
		'responsive_images',
		'imageSizeExport',
		'replace',
		'htmlmin:release',
		'terser:release',
		// 'ts:release',
		'sass:release',
		'postcss:release',
		'copy:release'
	]);
};
