/* eslint-env node, grunt */

'use strict';

module.exports = function(grunt) {
	// *****************************************************************************************************************
	// Variables
	// *****************************************************************************************************************
	const sass = require('node-sass');
	const mozjpeg = require('imagemin-mozjpeg');
	const postcssPresetEnv = require('postcss-preset-env');

	// *****************************************************************************************************************
	// Load NPM Plugins
	// *****************************************************************************************************************
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-cwebp');
	grunt.loadNpmTasks('grunt-image-size-export');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-stylelint');
	grunt.loadNpmTasks('grunt-svgstore');
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
			build: {
				files: [
					{
						expand: true,
						cwd: 'build',
						src: ['**']
					}
				]
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'dist',
						src: ['**']
					}
				]
			},
			optimized_assets: {
				/* eslint-disable-line camelcase */
				files: [
					{
						expand: true,
						cwd: 'optimized_assets',
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
						src: ['src/favicon.ico', 'src/assets/icons/mh-photography.svg'],
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
						src: ['assets/icons/*.png', 'assets/videos/**/*'],
						dest: 'dist/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: false,
						cwd: 'optimized_assets/',
						src: ['**/*'],
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
						src: [
							'src/favicon.ico',
							'src/assets/icons/mh-photography.svg',
							'src/robots.txt',
							'src/sitemap.xml',
							'src/manifest.webmanifest'
						],
						dest: 'dist/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: false,
						cwd: 'src/',
						src: ['assets/icons/*.png', 'assets/videos/**/*'],
						dest: 'dist/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: false,
						cwd: 'optimized_assets/',
						src: ['**/*'],
						dest: 'dist/',
						filter: 'isFile'
					}
				]
			}
		},
		cwebp: {
			optimize: {
				options: {
					q: 80,
					m: 5
					// lossless: false
				},
				files: [
					{
						expand: true,
						src: ['**/*.jpg'],
						cwd: 'build/',
						dest: 'optimized_assets/'
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
				src: ['src/scripts/**/*.js', '!src/scripts/**/*.min.js']
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
		imagemin: {
			options: {
				quality: 75,
				optimizationLevel: 4, // default 3
				progressive: true,
				use: [mozjpeg()] // Example plugin usage
			},
			optimize: {
				files: [
					{
						expand: true,
						src: ['assets/images/layout/**.jpg', 'assets/images/pictures/**/*.jpg'],
						cwd: 'build/',
						dest: 'optimized_assets/'
					}
				]
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
					}),
					postcssPresetEnv()
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
						},
						{
							match: /(.*)\.jpg--(.*)/g,
							replacement: '$1--$2'
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
							match: /{{BUILD}}/g,
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
			/* eslint-disable-line camelcase */
			options: {
				concurrency: 2,
				rename: false
			},
			resize: {
				options: {
					// density: 72,
					quality: 100,
					sizes: [
						{
							suffix: '--320',
							width: 320
						},
						{
							suffix: '--640',
							width: 640
						},
						{
							suffix: '--768',
							width: 768
						},
						{
							suffix: '--1024',
							width: 1024
						},
						{
							suffix: '--1366',
							width: 1366
						},
						{
							suffix: '--1600',
							width: 1600
						},
						{
							suffix: '--1920',
							width: 1920
						},
						{
							suffix: '--2560',
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
						src: ['assets/images/layout/**.jpg', 'assets/images/pictures/**/*.jpg'],
						cwd: 'src/',
						dest: 'build/'
					}
				]
			}
			// optimize: {
			// 	options: {
			// 		customIn: ['-interlace', 'line'], // produce progressive images
			// 		quality: 80
			// 	},
			// 	files: [
			// 		{
			// 			expand: true,
			// 			src: ['assets/images/layout/**.jpg', 'assets/images/pictures/**/*.jpg'],
			// 			cwd: 'build/',
			// 			dest: 'optimized_assets/'
			// 		}
			// 	]
			// }
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
		svgstore: {
			options: {
				cleanup: false,
				includeTitleElement: false,
				svg: {
					// viewBox: '0 0 500 500',
					xmlns: 'http://www.w3.org/2000/svg',
					'xmlns:svg': 'http://www.w3.org/2000/svg',
					'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
					'xmlns:cc': 'http://creativecommons.org/ns#',
					'xmlns:rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
					'xmlns:xlink': 'http://www.w3.org/1999/xlink',
					'xmlns:sodipodi': 'http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd',
					'xmlns:inkscape': 'http://www.inkscape.org/namespaces/inkscape'
				}
			},
			icons: {
				files: {
					'dist/assets/icons/icons.svg': ['src/assets/icons/**/*.svg']
				}
			}
		},
		terser: {
			options: {
				compress: true,
				ecma: 2015
				// mangle: true
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
	 * Optimize assets
	 */
	grunt.registerTask('optimize-assets', [
		'clean:build',
		'clean:optimized_assets',
		'responsive_images',
		'imagemin',
		'cwebp'
	]);

	/**
	 * Debug Build
	 */
	grunt.registerTask('debug', [
		'clean:build',
		'clean:dist',
		'copy:build',
		'imageSizeExport',
		'replace',
		'svgstore',
		'htmlmin:debug',
		'terser:debug',
		'sass:debug',
		'postcss:debug',
		'copy:debug'
	]);

	/**
	 * Release Build
	 */
	grunt.registerTask('release', [
		'clean:build',
		'clean:dist',
		'copy:build',
		'imageSizeExport',
		'replace',
		'svgstore',
		'htmlmin:release',
		'terser:release',
		'sass:release',
		'postcss:release',
		'copy:release'
	]);
};
