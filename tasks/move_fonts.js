module.exports = function (gulp, plugins, vars) {
	return function () {

		gulp.src(vars.moveFonts).pipe(gulp.dest('dist/fonts/'));
	};
};
