var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    cssmin      = require('gulp-minify-css'),
    uglify      = require('gulp-uglify'),
    jshint      = require('gulp-jshint'),
    scsslint    = require('gulp-sass-lint'),
    prefix      = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    minifyHTML  = require('gulp-minify-html'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    plumber     = require('gulp-plumber'),
    deploy      = require('gulp-gh-pages'),
    notify      = require('gulp-notify');

gulp.task('scss', function() {
  var onError = function(err) {
    notify.onError({
      title:    "Gulp",
      subtitle: "Failure!",
      message:  "Error: <%= error.message %>",
      sound:    "Beep"
    })(err);
    this.emit('end');
  };

	return gulp.src('src/scss/*.scss')
	  .pipe(plumber({errorHandler: onError}))
	  .pipe(sass())
	  .pipe(prefix())
	  .pipe(gulp.dest('dist/assets/css'))
	  .pipe(cssmin())
	  .pipe(rename({ suffix: '.min' }))
	  .pipe(gulp.dest('dist/assets/css'))
    .pipe(reload({stream:true}))
	});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "dist/"
    }
  });
});

gulp.task('deploy', function () {
  return gulp.src('dist/**/*')
    .pipe(deploy());
});

gulp.task('copy', function() {
  gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('dist/assets'))
    .pipe(reload({stream:true}));
});

gulp.task('js', function() {
  gulp.src('src/assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(reload({stream:true}));
});

gulp.task('scss-lint', function() {
  gulp.src('src/assets/scss/**/*.scss')
    .pipe(scsslint());
});

gulp.task('minify-html', function() {
	var opts = {
	  comments:true,
	  spare:true
	};

gulp.src('src/*.html')
  .pipe(minifyHTML(opts))
  .pipe(gulp.dest('dist/'))
  .pipe(reload({stream:true}));
});

gulp.task('jshint', function() {
  gulp.src('src/assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/assets/js/*.js', ['jshint', 'js']);
  gulp.watch('src/*.html', ['minify-html']);
  gulp.watch('src/assets/img/*', ['imgmin']);
});

gulp.task('imgmin', function () {
  return gulp.src('src/assets/img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/assets/img'));
});

// Run gulp tasks
// Note order of operations
gulp.task('default', ['browser-sync', 'copy', 'js', 'imgmin', 'minify-html', 'scss', 'watch']);
