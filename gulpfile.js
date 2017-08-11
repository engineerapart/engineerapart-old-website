var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var ga = require('gulp-ga');
var pug = require('gulp-pug');
var ghPages = require('gulp-gh-pages');


// Compile LESS files from /less into /css
gulp.task('less', function () {
  return gulp.src('less/engineer-apart.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function () {
  return gulp.src('css/engineer-apart.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./static/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify JS
gulp.task('minify-js', function () {
  var gulpSrc = gulp.src(['js/engineer-apart.js','js/jquery.BlackAndWhite.js','js/location-map.js']);
  if (process.env.NODE_ENV === 'production') gulpSrc = gulpSrc.pipe(uglify());
  return gulpSrc
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./static/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Copy CNAME
gulp.task('copy-cname', function () {
  gulp.src([
    './CNAME',
  ])
  .pipe(gulp.dest('./static'))
});

// Copy assets
gulp.task('copy-img', function () {
  gulp.src([
    'img/**',
  ])
  .pipe(gulp.dest('./static/img'))
});

// Convert Pug template to html
gulp.task('pug', function buildHTML() {
  return gulp.src('./html/*.pug')
    .pipe(pug({
      pretty: process.env.NODE_ENV === 'development'
    }))
    .pipe(gulp.dest('./static/'));
});

// Google Analytics
gulp.task('ga', ['pug'], function () {
  gulp.src('./static/index.html')
    .pipe(ga({
      url: 'engineerapart.com',
      uid: 'UA-104209956-1',
      anonymizeIp: false,
      sendPageView: true,
    }))
    .pipe(gulp.dest('./static/'));
});

// Run everything
gulp.task('default', ['minify-css', 'minify-js', 'copy-img', 'pug', 'ga', 'copy-cname']);

// Dev build
gulp.task('build-dev', ['minify-css', 'minify-js', 'copy-img', 'pug']);

// Configure the browserSync task
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: './static/'
    },
  })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'minify-css', 'minify-js', 'copy-img', 'pug'], function () {
  gulp.watch('less/*.less', ['less']);
  gulp.watch('css/*.css', ['minify-css']);
  gulp.watch('js/*.js', ['minify-js']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('./html/index.pug', ['pug', browserSync.reload]);
  gulp.watch('js/**/*.js', browserSync.reload);
});

// Deploy
gulp.task('deploy', ['default'], function() {
  return gulp.src('./static/**/*')
    .pipe(ghPages({
      branch: 'master'
    }));
});