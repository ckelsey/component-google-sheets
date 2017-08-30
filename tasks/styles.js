module.exports = function (gulp, plugins, vars) {
	return function () {

		gulp.src(vars.styles)
		.pipe(plugins.plumber(vars.plumberErrorHandler))
		.pipe(gulp.dest('dist/css/build/sass'))
		.pipe(plugins.compass({
			css: 'dist/css/build/css',
			sass: 'dist/css/build/sass',
			image: 'app/css/images'
		}))
		.pipe(plugins.autoprefixer('last 2 version', 'Safari', 'ie', 'opera', 'ios', 'android', 'chrome', 'firefox'))
		.pipe(plugins.concat(vars.appName + '_demo.css'))
		.pipe(plugins.rename({
			suffix: '.min'
		}))
		.pipe(plugins.cleanCss())
		.pipe(gulp.dest('dist/css'));
	};
};
