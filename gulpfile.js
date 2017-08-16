var gulp = require("gulp"),
browserify = require("browserify"),
source = require("vinyl-source-stream"),
buffer = require("vinyl-buffer"),
tslint = require("gulp-tslint"),
tsc = require("gulp-typescript"),
sourcemaps = require("gulp-sourcemaps"),
uglify = require("gulp-uglify"),
runSequence = require("run-sequence"),
mocha = require("gulp-mocha"),
istanbul = require("gulp-istanbul"),
browserSync = require('browser-sync').create();

gulp.task("lint", function() {
    return gulp.src([
        "source/**/**.ts",
        "test/**/**.test.ts"
    ])
    .pipe(tslint({}))
    .pipe(tslint.report("verbose"));
});

var tsProject = tsc.createProject("tsconfig.json");

gulp.task("build-app", function() {
    return gulp.src([
        "source/**/**.ts",
        "typings/main.d.ts/",
        "source/interfaces/interfaces.d.ts"
    ])
    .pipe(tsc(tsProject))
    .js.pipe(gulp.dest("source/"));
});

gulp.task("bundle", function() {
    var libraryName = "myapp";
    var mainTsFilePath = "source/main.js";
    var outputFolder = "dist/";
    var outputFileName = libraryName + "min.js";

    var bundler = browserify({
        debug : true,
        standalona : libraryName
    });

    return bundler.add(mainTsFilePath)
        .bundle()
        .pipe(source(outputFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps : true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(outputFolder));
});

gulp.task("watch", ["default"], function() {
    browserSync.init({
        server : "."
    });

    gulp.watch([ "source/**/**.ts", "test/**/**.ts"], ["default"]);
    gulp.watch("dist/*.js").on("change", browserSync.reload);
});

var tsTestProject = tsc.createProject("tsconfig.json");

gulp.task("build-test", function() {
    return gulp.src([
        "test/**/*.ts",
        "typings/main.d.ts/",
        "source/interfaces/interfaces.d.ts"
    ])
    .pipe(tsc(tsTestProject))
    .js.pipe(gulp.dest("test/"));
});

gulp.task("instanbul:hook", function() {
    return gulp.src(["source/**/*.js"])
    // covering files
    .pipe(istanbul())
    // force 'require' to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task("test", ["instanbul:hook"], function() {
    return gulp.src(["source/**/*.test.js"])
    // covering files
    .pipe(mocha({ ui : 'bdd' }))
    // force 'require' to return covered files
    .pipe(istanbul.writeReports());
});