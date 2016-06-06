'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	requirejsOptimize = require('gulp-requirejs-optimize'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css'),
    livereload = require('gulp-livereload');

gulp.task('sass', function() {
  gulp.src('./css/*.scss')
    .pipe(sass({ errLogToConsole: true, sync: true }))
    .pipe(minifyCss({compatibility: 'ie7'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function() {
	return gulp.src('./js/**/*.js')
        .pipe(requirejsOptimize(function(file) {
        	return {
			    baseUrl: 'js/',
			    name: 'app',
			    out: 'game.js',
			    urlArgs : "v=" + (new Date()).getTime(),
			    waitSeconds: 60,
			    optimize: 'uglify2',
			    normalizeDirDefines: 'all',
			    preserveLicenseComments: false,
			    paths: {
			        'GameObjectsModel': 'models/GameObjects',
			        'LocaleModel': 'models/Locale',
			        'jquery': 'libs/jquery',
			        'underscore': 'libs/underscore',
			        'view': 'libs/view',
			        'createjs': 'libs/createjs',
			        'json2': 'libs/json2',
			        'taffy': 'libs/taffy.min',
			        'MainView': 'views/MainView',
			        'PreloadView': 'views/PreloadView',
			        'HomeView': 'views/HomeView',
			        'GameView': 'views/GameView',
			        'StatsView': 'views/StatsView',
			        'InfoView': 'views/InfoView',
			        'app': 'app'
			    },
			    shim : {
			        'underscore' : {
			            exports : '_'
			        },
			        'createjs' : {
			            exports : 'createjs'
			        },
			        'view' : {
			            exports : 'View',
			            deps : [
			                'underscore'
			            ]
			        },
			        'taffy' : {
			            exports : 'TAFFY'
			        },
			        'jquery' : {
			            deps : [
			                'view'
			            ]
			        }
			    }
			};
		}))
		.pipe(gulp.dest('./js'));
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./css/*.scss', ['sass']);
	gulp.watch('./css/*.css').on('change', function(){
		livereload.changed('http://localhost/iTreCarte/development/iPhone/html.canvas/index.html', 80);
	});
	gulp.watch('./*.html').on('change', function(){
		livereload.changed('http://localhost/iTreCarte/development/iPhone/html.canvas/index.html', 80);
	});
});

gulp.task('deploy', function() {
	livereload.listen();
	gulp.watch('./css/*.scss', ['sass']);
	gulp.watch('./js/**/*.js', ['scripts']);
	gulp.watch('./css/*.css').on('change', function(){
		livereload.changed('http://localhost/iTreCarte/development/iPhone/html.canvas/index.html', 80);
	});
});