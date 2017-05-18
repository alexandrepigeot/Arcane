var gulp = require("gulp");
var sass = require("gulp-sass");
var pfix = require("gulp-autoprefixer");
var ts = require("gulp-typescript");
var web = require("gulp-webserver");

var files = {
	sass: "./src/**/*.scss",
	ts: "./src/**/*.ts"
}

gulp.task("default", ["run-sass", "run-ts"], function () {
	gulp.src("./")
		.pipe(web({
			livereload: true,
			directoryListing: true,
			open: true
		}));
	gulp.watch(files.sass, ["run-sass"]);
	gulp.watch(files.ts, ["run-ts"]);
});

gulp.task("run-sass", function () {
	gulp.src(files.sass)
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(pfix({ browsers: ["last 2 versions"] }))
		.pipe(gulp.dest("./"));
});

gulp.task("run-ts", function () {
	gulp.src(files.ts)
		.pipe(ts({
			noImplicitAny: true
		}))
		.pipe(gulp.dest("./"));
})