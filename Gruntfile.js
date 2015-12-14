module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var mozjpeg = require('imagemin-mozjpeg');

	grunt.initConfig({

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
					require('autoprefixer-core')({browsers: 'last 2 versions'}), // add ven	prefixes
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
			build: {
				options: {
					linenos: false,
					compress: false
				},
				files: {
					'css/stylus/style.css': 'src/stylus/main.styl'
				}
			}
		},
		uglify: {
			js: {
				src: ['src/js/**/*.js'],
				dest: 'js/main.js'
			}
		},
		imagemin: {
			dynamic: {
				options: {
					optimizationLevel: 7,
					svgoPlugins: [{ removeViewBox: false }],
					use: [mozjpeg()]
				},
				files: [{
					expand: true,
					cwd: 'src/assets',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'assets/'
				}]
			}
		},

		watch: {
			css: {
				files: ['src/sass/**/*.scss'],
				tasks: ['sass', 'postcss'],
				options: {
					livereload: {
						host: 'localhost',
						port: 7777
					}
				}
			},
			stylus: {
				files: ['src/stylus/**/*.styl'],
				tasks: ['stylus:build', 'postcss']
			},
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['uglify:js']
			},
			img: {
				files: ['src/assets/*'],
				tasks: ['imagemin']
			}
		}
	});

	grunt.registerTask('default', 'watch');

};
