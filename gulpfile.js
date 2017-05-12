var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');

/* ====================================== */
/* Wait for build, then launch the Server */
/* ====================================== */

// The browser sync task
// info here http://www.browsersync.io/docs/gulp/
gulp.task('serve', ['sass', 'js-watch'], function () {
  browserSync.init({
    // available options here: http://www.browsersync.io/docs/options/
    server: {
      baseDir: '_site',
    },

    // displays message in browser when reload happens or styles injected
    notify: false,
  });

  /* ============================================= */
  /* Watch sass files for changes & recompile      */
  /* Watch html/js files, run & reload BrowserSync */
  /* ============================================= */

  // watch the sass and html/js files for changes, then run the appropriate task
  gulp.watch('assets/css/**', ['sass']);
  gulp.watch('assets/js/**', ['js-watch']);
  gulp.watch('_site/*.html').on('change', browserSync.reload);
});

/* ========================================================================== */
/* Compile files from _sass into both _site/css (for live injecting) and site */
/* ========================================================================== */
gulp.task('sass', function () {
  // source file
  return gulp.src('assets/css/main.sass')
    .pipe(sass({
      includePaths: ['css'],
      style: 'compressed',
    }))

    // autoprefixer task
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))

   // copy output
    .pipe(gulp.dest('assets/css'))

    // final destination
   .pipe(gulp.dest('_site/assets/css'))

    // pipe the stream to the browsersync reload task to update the css without refreshing the page
    .pipe(browserSync.stream());
});

/* ========================================== */
/* Compile files from assets/js into _site/js */
/* ========================================== */
gulp.task('js', function () {
  return gulp.src('assets/js/*js')
    .pipe(gulp.dest('_site/assets/js'));
});

/* ============================================ */
/* Wait for complete SASS/JS changes and reload */
/* ============================================ */
gulp.task('js-watch', ['js'], function (done) {
  browserSync.reload();
  done();
});

/* ========================================================== */
/* Default task, running just `gulp` will compile the sass,   */
/* compile the site, launch BrowserSync & watch files.        */
/* ========================================================== */

// The default task run when you do 'gulp' on the command line
gulp.task('default', ['serve']);
