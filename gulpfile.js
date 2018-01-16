var gulp =  require('gulp');
var compress_css = require('gulp-minify-css');
var compress_html = require('gulp-minify-html');
var compress_js = require('gulp-uglify');
var webserver = require('gulp-webserver');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
var sass = require('gulp-sass');
gulp.task('sass', function(){
  gulp.src('./scss/*scss')
  .pipe(sass())
  .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
        }))
  .pipe(gulp.dest('css'));
})
gulp.task('compress_css', function(){
  gulp.src('./css/*.css')
  .pipe(compress_css())
  .pipe(gulp.dest('./dist/css'));
})
gulp.task('compress_html', function(){
  gulp.src('./html/*.html')
  .pipe(fileinclude({
    prefix: '@@',
    basepath:'@file'
  }))
  .pipe(compress_html())
  .pipe(gulp.dest('./dist/html'));
  gulp.src('./index.html')
  .pipe(compress_html())
  .pipe(gulp.dest('./dist'))

})
gulp.task('compress_js', function(){
  gulp.src('./js/*.js')
  .pipe(compress_js())
  .pipe(gulp.dest('./dist/js'))
})
gulp.task('copy_image', function(){
  gulp.src('./images/**/*')
  .pipe(gulp.dest('./dist/images'))
})
gulp.task('copy_sound', function(){
  gulp.src('./sound/**/*')
  .pipe(gulp.dest('./dist/sound'))
})
gulp.task('compress_js', function(){
  gulp.src('./js/*.js')
  .pipe(compress_js())
  .pipe(gulp.dest('./dist/js'))
})
gulp.task('watch', function(){
  gulp.watch('./scss/*scss', ['sass'])
})
gulp.task('webserver', function(){
  gulp.src('./')
  .pipe(webserver({
    livereload:true,
    open: true,
    port: 9000
  }));
})
gulp.task('webserver-dist', function(){
  gulp.src('./dist')
  .pipe(webserver({
    livereload:true,
    open: true
  }));
})
gulp.task('dev-dist', ['webserver-dist'],function(){
})
gulp.task('dev', ['webserver', 'watch'],function(){
})
gulp.task('build', ['sass','compress_css','compress_html', 'compress_js', 'copy_image', 'copy_sound'],function(){
})
