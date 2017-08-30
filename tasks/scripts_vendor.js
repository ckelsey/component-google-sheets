module.exports = function (gulp, plugins, vars) {
	return function () {

		gulp.src(vars.scriptsVendor)
		.pipe(plugins.plumber(vars.plumberErrorHandler))
		.pipe(plugins.concat(vars.appName + '_vendor.min.js'))
		.pipe(gulp.dest('dist/js'))
	};
};
