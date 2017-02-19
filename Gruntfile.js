module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	require('time-grunt')(grunt);
	grunt.initConfig();

	grunt.initConfig({
		browserify: {
			client: {
				src: ['src/js/main.js'],
				dest: 'js/main.js'
			}
		},
		postcss: {
			options: {
				map: {
					inline: false,
					annotation: 'css/maps/'
				},
				processors: [
					require('pixrem')(),
					require('autoprefixer')({browsers: 'last 2 versions'}),
					require('cssnano')()
				]
			},
			dist: {
				src: 'css/*/*.css'
			}
		},
		sass: {
			dist: {
				options: {
					style: 'nested'
				},
				files: {
					'css/style.css': 'src/sass/main.scss'
				}
			}
		},
		uglify: {
			js: {
				src: ['js/main.js'],
				dest: 'js/main.js'
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
			browserify: {
				files: ['src/js/main.js'],
				tasks: ['browserify:client'],
				options: {
					livereload: {
						host: 'localhost',
						port: 7777
					}
				}
			}
		}
	});
	grunt.registerTask('default', 'watch');
};
