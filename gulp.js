var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('server', () =>{
  nodemon({
    script: 'server.js',
    env: {
      "NODE_ENV": 'development'
    }
  })
})