(function (app) {

	var timer = null;
	var sheetID = null;
	var scriptID = null;
	var domain = null;
	var defaultWorksheet = 'od6';

	function googleSheetsService($http, $q, $sce) {

		var self = {



			worksheets: {},



			setWorksheets: function () {
				return $q(function (resolve, reject) {
					var url = 'https://spreadsheets.google.com/feeds/worksheets/' + sheetID + '/public/values';

					$http({
						method: 'jsonp',
						url: $sce.trustAsResourceUrl(url)
					}).then(function (res) {
						var parser = new DOMParser(), entries = [];

						try {
							var xmlDoc = parser.parseFromString(res.data, "text/xml");
							entries = xmlDoc.querySelectorAll('entry');
						} catch (e) {
							reject(e);
						}

						for (var i = 0; i < entries.length; i = i + 1) {
							var temp = {};
							var children = entries[i].childNodes;

							for (var c = 0; c < children.length; c = c + 1) {
								if (children[c]) {
									if (children[c].tagName.toLowerCase() === 'id') {
										temp.id = children[c].textContent.split('/')[children[c].textContent.split('/').length - 1];
									}

									if (children[c].tagName.toLowerCase() === 'title') {
										temp.title = children[c].textContent;
									}
								}
							}

							self.worksheets[temp.id] = temp;
						}

						resolve(self.worksheets);
					}, function (err) {
						reject(err);
					});
				});
			},



			read: function (worksheet, query) {
				return $q(function (resolve, reject) {
					worksheet = worksheet || defaultWorksheet;

					var url = 'https://spreadsheets.google.com/feeds/list/' + sheetID + '/' + worksheet + '/public/values';

					$http({
						method: 'jsonp',
						url: $sce.trustAsResourceUrl(url)
					}).then(function (res) {
						var parser = new DOMParser(), entries = [], lastUpdated, title, totalResults;

						try {
							var xmlDoc = parser.parseFromString(res.data, "text/xml");
							entries = xmlDoc.querySelectorAll('entry');
							lastUpdated = new Date(xmlDoc.querySelector('updated').textContent);
							title = xmlDoc.querySelector('title').textContent;
						} catch (e) {
							reject(e);
						}

						var result = {
							title: title,
							lastUpdated: lastUpdated,
							entries: {}
						};

						for (var i = 0; i < entries.length; i = i + 1) {
							var temp = {};
							var children = entries[i].childNodes;

							for (var c = 0; c < children.length; c = c + 1) {
								if (children[c]) {
									if (children[c].tagName.toLowerCase().indexOf('gsx:') > -1) {
										temp[children[c].tagName.split('gsx:')[1]] = children[c].textContent;
									} else if (children[c].tagName.toLowerCase() === 'id') {
										temp.google_url = children[c].textContent;
										temp.id = temp.google_url.split('/')[temp.google_url.split('/').length - 1];
									}
								}
							}

							if (Object.keys(temp).length) {
								result.entries[i] = temp;
							}
						}

						if (query) {
							var searchResults = {};

							for (var r in result.entries) {
								for (var q in query) {
									for (var o in query[q]) {
										switch (o) {
											case '>':
												if (result.entries[r][q] && parseFloat(result.entries[r][q]) > query[q][o]) {
													searchResults[r] = result.entries[r];
												}
												break;

											case '<':
												if (result.entries[r][q] && parseFloat(result.entries[r][q]) < query[q][o]) {
													searchResults[r] = result.entries[r];
												}
												break;
											case '>=':
												if (result.entries[r][q] && parseFloat(result.entries[r][q]) >= query[q][o]) {
													searchResults[r] = result.entries[r];
												}
												break;

											case '<=':
												if (result.entries[r][q] && parseFloat(result.entries[r][q]) <= query[q][o]) {
													searchResults[r] = result.entries[r];
												}
												break;
											case 'like':
												if (result.entries[r][q] && result.entries[r][q].indexOf(query[q][o]) > -1) {
													searchResults[r] = result.entries[r];
												}
												break;
											default:
												if (result.entries[r][q] && result.entries[r][q] === query[q][o]) {
													searchResults[r] = result.entries[r];
												}
										}
									}
								}
							}

							result.entries = searchResults;

							return resolve(result);

						} else {
							return resolve(result);
						}

					}, function (err) {
						return reject(err);
					});
				});
			},



			create: function (dataToSend, worksheet) {

				for (var e = 0; e < dataToSend.length; e++){
					var hex = '';
					for (var i = 0; i < angular.toJson(dataToSend[e]).length; i++) {
						hex += '' + angular.toJson(dataToSend[e]).charCodeAt(i).toString(16);
					}
					dataToSend[e].confirmationID = (new Date().getTime()) + '_' + hex;
				}

				var postUrl = 'https://script.google.com/a/macros/' + domain + '/s/' + scriptID + '/dev?';
				postUrl = postUrl + 'sheetId=' + sheetID + '&sheet=' + encodeURIComponent(worksheet || self.worksheets[defaultWorksheet].title) + '&data=' + encodeURIComponent(angular.toJson(dataToSend));

				return $q(function (resolve, reject) {

					function getNewData() {
						self.read(worksheet).then(function (res) {

							for (var r in res.entries) {
								if (res.entries[r].confirmationid === dataToSend[0].confirmationID) {
									return resolve(res);
								}
							}

							return reject(res);
						});
					}

					$http({
						method: 'jsonp',
						url: $sce.trustAsResourceUrl(postUrl),
					})
						.then(getNewData)
						// GOOGLE will always fail this
						.catch(getNewData);
				});
			},



			init: function () {
				clearTimeout(timer);

				if ($http) {
					$http({
						method: 'get',
						url: 'sheets.config.json'
					}).then(function (res) {
						sheetID = res.data.sheetId;
						scriptID = res.data.scriptId;
						domain = res.data.domain;
						self.setWorksheets();
					});
				} else {
					timer = setTimeout(function () {
						self.init();
					}, 200);
				}
			}
		};

		self.init();

		return self;
	}

	googleSheetsService.$inject = [
		'$http',
		'$q',
		'$sce'
	];

	app.service('googleSheetsService', googleSheetsService);
})(angular.module('google-sheets-component', []));