var gulp = require("gulp");
var sass = require("gulp-sass");
var pfix = require("gulp-autoprefixer");
var ts = require("gulp-typescript");
var web = require("gulp-webserver");

var path = {
	sass: "./src/**/*.scss",
	ts: "./src/**/*.ts",
	output: "./content",
	web: "./"
}

gulp.task("default", ["run-sass", "run-ts"], function () {
	gulp.src(path.web)
		.pipe(web({
			livereload: true,
			directoryListing: false,
			open: true,
			fallback: "index"
		}));
	gulp.watch(path.sass, ["run-sass"]);
	gulp.watch(path.ts, ["run-ts"]);
});

gulp.task("run-sass", function () {
	gulp.src(path.sass)
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(pfix({ browsers: ["last 2 versions"] }))
		.pipe(gulp.dest(path.output));
});

gulp.task("run-ts", function () {
	gulp.src(path.ts)
		.pipe(ts({
			noImplicitAny: true
		}))
		.pipe(gulp.dest(path.output));
})