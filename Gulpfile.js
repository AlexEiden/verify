var browserify = require('browserify');
var gulp       = require('gulp');
var stream     = require("vinyl-source-stream");
var tsify      = require("tsify");
var gulpif     = require("gulp-if");
var uglify     = require("gulp-uglify");
var streamify  = require("gulp-streamify");
var sourcemaps = require("gulp-sourcemaps");

/*
Environment:

NODE_ENV - 'production' enables minification

*/

var prod = process.env.NODE_ENV && process.env.NODE_ENV.indexOf("prod") != -1;

gulp.task('scripts', function (cb) {
    var scriptError = false;

    return browserify({debug: !prod})
        .add('./app/main.ts')
        .plugin(tsify, { noImplicitAny: true })
        .bundle()
        .on('error', function (error) { cb(error); })
        .pipe(stream('bundle.js'))
        .pipe( gulpif(prod, streamify(uglify())))
        .pipe(gulp.dest("./build/"));
});

gulp.task("build", ["scripts"]);