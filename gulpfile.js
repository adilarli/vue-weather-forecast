var gulp = require('gulp');
var concat = require('gulp-concat');
var webpack = require('webpack-stream');


gulp.task('build', ['js','html']);

// gulp ve webpack ile bundlıyoruz.
gulp.task('js', [], function() {
    return gulp.src('./src/views')
        .pipe(webpack(require('./config/webpack.config.js')))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist'))
        ;
});

// index.html dosyasını kopyalıyoruz.
gulp.task('html', function () {
    return gulp.src('./src/index.html').pipe(gulp.dest('./dist'));
});

/*
Css webpack ile import edildiği için pasif
gulp.task('styles', function () {

        return gulp.src('./src/assets/scss/app.scss')
            .pipe(sass({
                outputStyle: 'expanded'
            }))
            .pipe(rename('style.css'))
            .pipe(gulp.dest('./dist'))
            .pipe(sass({
                outputStyle: 'compressed'
            }))
            .pipe(rename('style.min.css'))
            .pipe(gulp.dest('./dist'));

});
*/

