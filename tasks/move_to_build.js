module.exports = function (gulp, plugins, vars) {
	return function () {

		gulp.src(vars.buildFiles, {base: './'}).pipe(gulp.dest('build'));
	};
};
