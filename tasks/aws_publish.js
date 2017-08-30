module.exports = function (gulp, plugins, vars) {
	return function () {

		var awsConfObject = require('./aws-config.json');

		var localConfig = {
			buildSrc: './build/**/*',
			getAwsConf: function (environment) {
				// var conf = require('../../config/aws');

				if (!awsConfObject[environment]) {
					throw 'No aws conf for env: ' + environment;
				}
				if (!awsConfObject[environment + 'Headers']) {
					throw 'No aws headers for env: ' + environment;
				}
				return { keys: awsConfObject[environment], headers: awsConfObject[environment + 'Headers'], distribution: awsConfObject[environment + 'Distribution'] };
			}
		};

		var awsConf = localConfig.getAwsConf('production');
		var publisher = plugins.awspublish.create(awsConf.keys);
		var cfSettings = {
			distribution: awsConf.distribution,
			accessKeyId: awsConf.keys.accessKeyId,
			secretAccessKey: awsConf.keys.secretAccessKey,
			//wait: true,
			indexRootPaths: true
		};

		plugins.runSequence('move_to_build', function() {
			gulp.src(localConfig.buildSrc)
			//.pipe(awspublish.gzip({ ext: '' }))
			.pipe(publisher.publish(awsConf.headers))
			.pipe(plugins.cloudfrontInvalidateAwsPublish(cfSettings))
			.pipe(publisher.cache())
			.pipe(publisher.sync())
			.pipe(plugins.awspublish.reporter());
			done();
		});
	};
};
