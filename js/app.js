angular.module('testApp', ['ngResource'])
    .factory('TracksService', ['$resource', function($resource){
        return $resource('/data.json', {}, {});
    }])
