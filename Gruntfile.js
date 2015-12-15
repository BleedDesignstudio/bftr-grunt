module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.initConfig({
		jade: {
			compile: {
				options: {
					pretty: true,
				},
				files: {
					'index.html': 'src/views/index.jade'
				}
			}
		},
		concat: {
			options: {
				separator: ';\n',
			},
			dist: {
				src: [				
						'lib/dependencies/modernizr.js',
						'lib/dependencies/jquery-1.11.1.min.js',
						'lib/underscore-min.js',
						'lib/backbone-min.js',
						'lib/jquery.mousewheel.min.js',
						'lib/velocity.min.js',
						'lib/slick.min.js',
						'lib/iscroll.js',
						'lib/gyro.js',
						'lib/bftrPlugins.js'						
				],
				dest: 'js/built.js',
			},
		},
		postcss: {
			options: {
				map: true, // inline sourcemaps 

				// or 
				map: {
					inline: false, // save all sourcemaps as separate files... 
					annotation: 'css/maps/' // ...to the specified directory 
				},
				processors: [
					require('pixrem')(), // add fallbacks for rem units 
					require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes 
					require('cssnano')() // minify the result 
				]
			},
			dist: {
				src: 'css/*/*.css'
			}
		},	
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/sass/style.css': 'src/sass/main.scss'
				}
			}
		},
		stylus: {
			compile: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/stylus/style.css': 'src/stylus/main.styl', 
				},
			},
		},		
		uglify: {
			js: {
				src: ['src/js/**/*.js'],
				dest: 'js/main.js'
			}
		},
		watch: {
			css: {
				files: ['src/sass/**/*.scss', 'src/stylus/**/*.styl'],
				tasks: ['sass', 'postcss', 'stylus'],
				options: {
					livereload: {
						host: 'localhost',
						port: 7777
					}
				}
			},
			stylus: {
				files: ['src/stylus/**/*.styl'],
				tasks: ['stylus', 'postcss']
			},
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['uglify', 'concat']
			},
			img: {
				files: ['src/assets/*'],
				tasks: ['imagemin']
			},
			jade: {
				files: 'src/views/**/*.jade',
				tasks: ['jade']
			}			
		}
	});
	grunt.registerTask('default', 'watch');
};
