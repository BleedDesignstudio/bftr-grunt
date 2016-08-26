module.exports = function(grunt) {
	
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	
	grunt.initConfig({
		concat: {
			options: {
				separator: ';\n',
			},
			dist: {
				src: [
						'lib/dependencies/modernizr.js',
						'lib/dependencies/jquery-1.11.1.min.js',
						'lib/dependencies/velocity.min.js',
						'lib/dependencies/ResizeSensor.js',
						'lib/dependencies/ElementQueries.js',
						'lib/slick.min.js',
						'lib/bftr.func.js'
				],
				dest: 'js/built.js',
			},
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
				src: ['src/js/**/*.js'],
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
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['uglify', 'concat'],
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
