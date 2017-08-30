module.exports = function (gulp, plugins, vars) {
	return function () {

		gulp.src(vars.moveToLib, {base: './'}).pipe(gulp.dest('lib'));
	};
};
