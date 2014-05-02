angular.module('jukeroxApp', ['ngResource'])
    .factory('TracksService', ['$resource', function($resource){
        return $resource('data/artists.json', {}, {});
    }])
