module.exports = function (gulp, plugins, vars) {
	return function () {
		var defaultFile = "index.html";
		var fs = require('fs');

		vars.browserSync.init({
			notify: false,
			server: {
				baseDir: "./",
				middleware: function(req, res, next) {
					var fileName = plugins.url.parse(req.url);
					fileName = fileName.href.split(fileName.search).join("");
					var u = plugins.url.resolve(__dirname, '.' + fileName);

					var fileExists = fs.existsSync(u);

					if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
						req.url = "/" + defaultFile;
					}
					return next();
				}
			}
		});
	};
};
