//imports
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('build', ['js', 'sass', 'html']);

//build javascript
gulp.task('js', function() {
    //copy vendor files
    gulp.src(mainBowerFiles())
        .pipe(filter('*.js'))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(__dirname +  '/public/js'));

    //copy javascripts
    gulp.src(['src/js/app.js',
              'src/js/service/**/*.js',
              'src/js/controller/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(__dirname +  '/public/js'));

    gulp.src('src/**/*.json')
        .pipe(gulp.dest(__dirname +  '/public'));
});

//build pages
gulp.task('html', function() {
    gulp.src('src/html/**')
        .pipe(gulp.dest(__dirname +  '/public'));
});

//build styles
gulp.task('sass', function() {
//
//    return sass('style/main.scss')
//        .pipe(gulp.dest('public/css'))
    sass('src/style/main.scss',{
            style: 'compressed',
            loadPath: [
                './bower_components/bootstrap-sass/assets/stylesheets',
                './bower_components/font-awesome/scss'
            ]
            }
        ).pipe(gulp.dest(__dirname +  '/public/css'));
});
