module.exports = function (gulp, plugins, vars) {
	return function () {

		gulp.src(vars.stylesVendor)
		.pipe(plugins.plumber(vars.plumberErrorHandler))
		.pipe(plugins.concat(vars.appName + '_vendor.css'))
		.pipe(plugins.rename({
			suffix: '.min'
		}))
		.pipe(plugins.cleanCss())
		.pipe(gulp.dest('dist/css'));
	};
};
