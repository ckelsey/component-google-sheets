exports.config = {
	specs: ['e2e/**/*.spec.js'],
	framework: 'jasmine2',
	jasmineNodeOpts: {
		silent: true,
		print: function() {}
	},
	capabilities: {
		browserName: 'chrome'
	},
	directConnect: true,
	baseUrl: 'http://localhost:8187'
};
