var SCRIPTS, sources;
SCRIPTS = require('./config/scripts').SCRIPTS;
sources = ['**/bundle.js', '**/*.spec.js'];

module.exports = function(config) {
	return config.set({
		autoWatch: false,
		basePath: 'dist',
		browsers: ['Chrome'],
		files: sources,
		frameworks: ['jasmine'],
		logLevel: 'WARN',
		port: 9877,
		singleRun: true,
		proxies: {
			'/img': '/src/img',
		}
	});
};


