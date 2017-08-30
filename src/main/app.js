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

	demo.controller('AppCtlr', function ($scope, $http, googleSheetsService){
		var self = this;
		$scope.googleSheetsService = googleSheetsService;

		// window.gapiReady = function () {
		// 	gapi.load('client', {
		// 		callback: function () {
		// 			googleSheetsService.init();
		// 		}
		// 	});
		// };

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
			title: 'Name of module',
			description: null,

			"googleSheetsService": {
				description: null,
				properties: {
					// "propertyOrMethod": {
					// 	description: null,
					// 	arguments: {
					// 		arg: {
					// 			type: null,
					// 			description: null
					// 		}
					// 	},
					// 	returns: {
					// 		type: null,
					// 		description: null
					// 	}
					// }
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
