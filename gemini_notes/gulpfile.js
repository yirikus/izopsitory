//imports
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');


gulp.task('build', ['js', 'sass', 'html']);

//build javascript
gulp.task('js', function() {
    //copy vendor files
    gulp.src(mainBowerFiles())
        .pipe(filter('*.js'))
        .pipe(concat('vendor.js'))
        //.pipe(uglify()) TODO angular friendly minification
        .pipe(gulp.dest(__dirname +  '/public/js'));

    //copy javascripts
    gulp.src(['src/js/app.js',
              'src/js/service/**/*.js',
              'src/js/controller/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(__dirname +  '/public/js'));
});

//build pages
gulp.task('html', function() {
    gulp.src('src/html/**')
        .pipe(gulp.dest(__dirname +  '/public'));
});

//build styles
gulp.task('sass', function() {
    return sass('sass/style.sass')
        .pipe(gulp.dest('public/css'))
});

//livereload
gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['build']);

    // Create LiveReload server
    //livereload.listen();

    // Watch any files in dist/, reload on change
    //gulp.watch(['public/**']).on('change', livereload.changed);

});

//start the server
gulp.task('connect', function () {
    connect.server({
        root: __dirname +  '/public',
        port: 9000,
        livereload: true
    });
});