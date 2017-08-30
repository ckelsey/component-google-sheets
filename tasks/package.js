module.exports = function (gulp, plugins, vars) {
	return function () {
		var path = require('path');
		var fs = require('fs');

		vars.pkg.name = path.basename(__dirname);
		fs.writeFileSync("./package.json", JSON.stringify(vars.pkg, null, "\t"));
		vars.pkg = require('./package.json');
	};
};
