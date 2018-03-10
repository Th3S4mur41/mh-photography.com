/* eslint-env node, grunt */
'use strict';

module.exports = function (grunt) {

	grunt.initConfig({
		pkg  : grunt.file.readJSON('package.json'),
		clean: {
			options: {
				force: true
			},
			dist: {
				files: [
					{
						expand: true,
						cwd   : 'dist',
						src   : [
							'**'
						]
					}
				]
			}
		},
		// concat: {
		// 	debug: {
		// 		options: {
		// 			separator: ' ',
		// 			sourceMap: true
		// 		},
		// 		files: {
		// 			'dist/scripts.js': [
		// 				'scripts/*.js',
		// 				'!scripts/*.min.js'
		// 			]
		// 		},
		// 		nonull: true
		// 	},
		// 	release: {
		// 		options: {
		// 			separator: ' ',
		// 			sourceMap: false
		// 		},
		// 		files: {
		// 			'dist/scripts.js': [
		// 				'scripts/*.min.js'
		// 			]
		// 		},
		// 		nonull: true
		// 	},
		// },
		copy: {
			debug: {
				files: [
					{
						expand : true,
						flatten: true,
						src    : [
							'src/favicon.ico'
						],
						dest  : 'dist/',
						filter: 'isFile'
					},
					{
						expand : true,
						flatten: false,
						cwd    : 'src/',
						src    : [
							'assets/icons/*.svg',
							'assets/images/**/*.jpg',
							'assets/images/**/*.png'
						],
						dest  : 'dist/',
						filter: 'isFile'
					}
				]
			},
			release: {
				files: [
					{
						expand : false,
						flatten: true,
						src    : [
							'src/favicon.ico',
							'src/robots.txt',
							'src/sitemap.xml'
						],
						dest  : 'dist/',
						filter: 'isFile'
					},
					{
						expand : true,
						flatten: false,
						cwd		  : 'src/',
						src    : [
							'assets/icons/*.svg',
							'assets/images/**/*.jpg',
							'assets/images/**/*.png'
						],
						dest  : 'dist/',
						filter: 'isFile'
					}
				]
			}
		},
		eslint: {
			options: {
				allowInlineConfig: true,
				// configFile: '.eslintrc',
				maxWarnings      : -1,
				useEslintrc      : true
			},
			all: {
				src: [
					'src/scripts/**/*.js',
					'!src/scipts/**/*.min.js'
				]
			}
		},
		htmlmin: {
			options: {
				collapseBooleanAttributes: true,
				collapseWhitespace       : true,
				// removeAttributeQuotes:          true,
				// removeEmptyAttributes:          true,
				removeRedundantAttributes: true,
				// removeScriptTypeAttributes:     true,
				// removeStyleLinkTypeAttributes:  true,
				html5                    : true
			},
			debug: {
				files: {
					'dist/index.html': 'src/index.html'
				}
			},
			release: {
				options: {
					removeComments: true
				},
				files: {
					'dist/index.html': 'src/index.html'
				}
			}
		},
		// jsonlint: {
		// 	options: {
		// 		formatter: 'prose'
		// 	},
		// 	all: {
		// 		src: ['src/main/webapp/**/*.json']
		// 	}
		// },
		// postcss: {
		// 	options: {
		// 		// map: true,
		// 		processors: [
		// 			require('autoprefixer')({
		// 				flexbox: 'no-2009',
		// 				grid   : false
		// 			})
		// 		]
		// 	},
		// 	lib: {
		// 		src: 'src/main/webapp/css/lib.css'
		// 	},
		// 	debug: {
		// 		src: 'src/main/webapp/css/style.css'
		// 	},
		// 	release: {
		// 		src: 'src/main/webapp/css/style.css'
		// 	}
		// },
		// replace: {
		// 	less: {
		// 		// workaround for compression bug that replaces 0% through 0
		// 		// leads to broken UI when using flex: x x 0%;
		// 		options: {
		// 			patterns: [
		// 				{
		// 					match      : /flex:(\d)\s(\d)\s0([;,}])/g,
		// 					replacement: 'flex:$1 $2 0%$3'
		// 				}
		// 			]
		// 		},
		// 		files: [
		// 			{
		// 				src: [
		// 					'src/main/webapp/css/style.min.css'
		// 				],
		// 				dest: 'src/main/webapp/css/style.min.css'
		// 			}
		// 		]
		// 	}
		// },
		sass: {
			options: {
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
				configFile            : '.stylelintrc',
				formatter             : 'string',
				ignoreDisables        : false,
				reportNeedlessDisables: false,
				syntax                : 'less'
			},
			all: {
				src: [
					'src/styles/**/*.scss',
					'src/styles/**/*.sass',
					'src/styles/**/*.css'
				]
			}
		},
		uglify: {
			options: {
				banner  : '/** * Copyright (c) 2018 Mouch.net */',
				compress: true,
				mangle  : false
				// wrap    : true
			},
			debug: {
				options: {
					sourceMap: true
					// sourceMapIncludeSources : true,
					// sourceMapIn : 'scripts/scripts.js.map'
				},
				files: {
					'dist/scripts.js': [
						'src/scripts/**/*.js',
						'!src/scripts/**/*.min.js'
					]
				}
			},
			release: {
				files: {
					'dist/scripts.js': [
						'src/scripts/**/*.js',
						'!src/scripts/**/*.min.js'
					]
				}
			}
		},
		watch: {
			options: {
				spawn        : true,
				interrupt    : true,
				debounceDelay: 1000
			},
			styles: {
				files: ['src/styles/**/*'],
				tasks: ['sass:debug']
			},
			scripts: {
				files: ['src/scripts/**/*.js'],
				tasks: ['uglify:debug']
			},
			html: {
				files: ['src/**/*.html'],
				tasks: ['htmlmin:debug']
			}
		}
	});


	// *****************************************************************************************************************
	// Load NPM Plugins
	// *****************************************************************************************************************
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	// grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-jsonlint');
	// grunt.loadNpmTasks('grunt-postcss');
	// grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-stylelint');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('gruntify-eslint');

	// *****************************************************************************************************************
	// Public tasks
	// *****************************************************************************************************************

	/**
	 * Debug Build
	 */
	grunt.registerTask('debug', [
		'clean',
		'htmlmin:debug',
		'uglify:debug',
		'sass:debug',
		'copy:debug'
	]);

	/**
	 * Release Build
	 */
	grunt.registerTask('release', [
		'clean',
		'htmlmin:release',
		'uglify:release',
		'sass:release',
		'copy:release'
	]);
};
