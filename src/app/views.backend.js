import angular from 'angular'

angular.module('app').run(($httpBackend) => $httpBackend.whenGET(/^.*\.(html|htm)$/).passThrough());