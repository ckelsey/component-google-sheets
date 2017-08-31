(function(demo){
	'use strict';
	demo.config(function ($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: "./demo.html",
			controller: 'AppCtlr',
		})
		.when('/readme', {
			templateUrl: "./readme.html",
			controller: 'AppCtlr',
		})
		.otherwise({ redirectTo: '/' });
		$locationProvider.html5Mode(true);
	});

	demo.controller('AppCtlr', function ($scope, googleSheetsService){
		var self = this;

		$scope.options = [{
			name: 'label 1',
			value: 1
		}, {
			name: 'label 2',
			value: 2
		}];

		$scope.change = function (option) {
			console.log(option);
		};

		this.documentation = {
			title: 'google-sheets-component',
			description: "CRUD interface for Google Sheets",

			"googleSheetsService": {
				description: "CRUD interface for Google Sheets",
				properties: {
					"worksheets": {
						description: 'An object containing the id and title of worksheets in the sheet'
					},

					"init": {
						description: "Gets and sets configuration data and calls setWorksheets()",
						returns: {
							type: 'void'
						}
					},

					"setWorksheets": {
						description: "Gets then sets the worksheets property",
						returns: {
							type: 'object',
							description: 'googleSheetsService.worksheets'
						}
					},

					"read": {
						description: "Gets sheet data and optionally searches rows for supplied query",
						arguments: {
							worksheet: {
								type: 'string',
								description: 'Optional, the id of the worksheet. Can use "worksheets" property to get the id. Defaults to the first worksheet.'
							},
							query: {
								type: 'object',
								description: ''
							}
						},
						returns: {
							type: 'object',
							description: '{ tite: "The title of the sheet", lastUpdated: "Last updated date", entries: {}}'
						}
					}
				}
			}
		};
	});
})(angular.module('app', [
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'google-sheets-component'
]));
