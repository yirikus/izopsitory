//imports
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var plugins = {};
plugins.mainBowerFiles = require('main-bower-files');
plugins.filter = require('gulp-filter');
plugins.concat = require('gulp-concat');

// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});


gulp.task('js', function() {

    var jsFiles = ['app/*'];

    gulp.src(plugins.mainBowerFiles().concat(jsFiles))
        .pipe(plugins.filter('*.js'))
        .pipe(plugins.concat('main.js'))
        .pipe(gulp.dest(dest + 'js'));

});


gulp.task('sass', function() {
    return sass('sass/style.sass')
        .pipe(gulp.dest('public/css'))
});

gulp.task('connect', function () {
    connect.server({
        root: __dirname +  '/public',
        port: 9000
    });
});