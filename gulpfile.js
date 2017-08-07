var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var ga = require('gulp-ga');
var pug = require('gulp-pug');

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
  ' */\n',
  ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function () {
  return gulp.src('less/engineer-apart.less')
    .pipe(less())
    .pipe(header(banner, { pkg: pkg }))
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
    .pipe(gulp.dest('./static/lp/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify JS
gulp.task('minify-js', function () {
  return gulp.src(['js/engineer-apart.js','js/jquery.BlackAndWhite.js','js/location-map.js'])
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./static/lp/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Copy assets
gulp.task('copy-img', function () {
  gulp.src([
    'img/**',
  ])
    .pipe(gulp.dest('./static/lp/img'))
})

// Google Analytics
gulp.task('ga', function () {
  gulp.src('./index.html')
    .pipe(ga({ url: 'qeeply.com', uid: 'UA-92898794-1' }))
    .pipe(gulp.dest('./static/'));
});

// Convert Pug template to html
gulp.task('pug', function buildHTML() {
  return gulp.src('./html/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./static/'));
});

// Convert Pug template to html
gulp.task('pug-dev', function buildHTML() {
  return gulp.src('./html/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./static/'));
});

// Run everything
gulp.task('default', ['minify-css', 'minify-js', 'copy-img', 'pug', 'ga']);

// Dev build
gulp.task('build-dev', ['minify-css', 'minify-js', 'copy-img', 'pug-dev']);

// Configure the browserSync task
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: './static/'
    },
  })
})


// Dev task with browserSync
gulp.task('dev', ['browserSync', 'minify-css', 'minify-js', 'copy-img', 'pug-dev'], function () {
  gulp.watch('less/*.less', ['less']);
  gulp.watch('css/*.css', ['minify-css']);
  gulp.watch('js/*.js', ['minify-js']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('./html/index.pug', ['pug-dev', browserSync.reload]);
  gulp.watch('js/**/*.js', browserSync.reload);
});
