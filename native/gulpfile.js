'use strict';

let gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    http = require('http'),
    st = require('st');

gulp.task('reload', function() {
  gulp.src('app/**/*')
    .pipe(livereload());
});

gulp.task('watch', ['server'], function() {
  livereload.listen({ basePath: 'app' });
    gulp.watch('app/**/*', ['reload']);
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname + '/app', index: 'index.html', cache: false })
  ).listen(8080, done);
});

gulp.task('default', ['watch']);