module.exports = function (gulp, plugins, vars) {
	return function () {

		gulp.src(vars.scripts)
		.pipe(plugins.plumber(vars.plumberErrorHandler))
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.ngAnnotate({
			// true helps add where @ngInject is not used. It infers.
			// Doesn't work with resolve, so we must be explicit there
			add: true
		}))
		.pipe(plugins.angularEmbedTemplates())
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default'))
		.pipe(plugins.concat(vars.appName + '_demo.min.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest('dist/js'))
	};
};
