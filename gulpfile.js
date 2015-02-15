var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    plumber      = require('gulp-plumber'),
    sass         = require('gulp-sass'),
    livereload   = require('gulp-livereload'),
    cssmin       = require('gulp-cssmin');
 
var pathSrc = {
  styles: 'scss/**/*.scss',
  scripts: 'js/**/*.js'
};
 
var pathDst = {
  styles: 'public/css',
  scripts: 'public/js'
};

gulp.task('styles', function () { // Compile scss files to css
  gulp.src( pathSrc.styles )
    .pipe( plumber() )
    .pipe( sass() )
    .pipe(cssmin())
    .pipe( gulp.dest( pathDst.styles ) );
});
 
gulp.task('scripts', function(){ // scripts command
  gulp.src( pathSrc.scripts )
    .pipe( plumber() )/// plumber before
    .pipe( uglify() )
    .pipe( gulp.dest( pathDst.scripts ) );
});

/* If removed, there is no page reload, but the SASS files still compile */
var tinylr;

gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});

/**/

gulp.task('watch', function() {

 // var server = livereload();

  gulp.task('build', ['styles']);
  gulp.watch(pathSrc.styles, ['styles'] );

  gulp.task('build', ['scripts']);
  gulp.watch(pathSrc.styles, ['scripts'] );

});

gulp.task('default', ['styles', 'scripts', 'livereload', 'watch']);