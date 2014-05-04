angular.module('jukeroxApp', ['ngResource'])
    .factory('ArtistsService', ['$resource', function($resource){
        return $resource('json/artists.json', {}, {});
    }])
    .factory('AlbumsService', ['$resource', function($resource){
        return $resource('json/albums.json', {}, {});
    }])
