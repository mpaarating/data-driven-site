angular.module('jukeroxApp', ['ngResource'])
    .factory('TracksService', ['$resource', function($resource){
        return $resource('data/data.json', {}, {});
    }])
