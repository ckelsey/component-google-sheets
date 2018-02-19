import angular from 'angular'
import demoTemplate from './demo.html'
import readmeTemplate from './readme.html'

angular.module('app', [
'ngResource',
'ngSanitize',
'ngRoute',
'googleSheetsComponent'
])
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			template: demoTemplate,
		})
		.when('/readme', {
			template: readmeTemplate,
		})
		.otherwise({ redirectTo: '/' });
		$locationProvider.html5Mode(true);
	})
	.controller('AppCtlr', function ($scope, googleSheetsService) {
		googleSheetsService.init().then(function () {

			// googleSheetsService.read().then(function(res){

			// 	googleSheetsService.create({val1:"one", val2:"two"}).then(function(res){

			// 		var newData = res.addedRows[0].row
			// 		newData.val1 = "NEW data"

			// 		googleSheetsService.update(newData, res.addedRows[0].index).then(function(res){
			// 			console.log(res)
			// 		})
			// 	})
			// })
		});


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
			title: 'googleSheetsComponent',
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
	})
;
