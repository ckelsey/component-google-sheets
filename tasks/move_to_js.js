module.exports = function (gulp, plugins, vars) {
	return function () {

		gulp.src(vars.moveToJs).pipe(gulp.dest('dist/js'));
	};
};
