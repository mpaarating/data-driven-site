angular.module('jukeroxApp', ['ngResource'])
    .factory('ArtistsService', ['$resource', function($resource){
        return $resource('json/artists.json', {}, {});
    }])
    .factory('AlbumsService', ['$resource', function($resource){
        return $resource('json/albums.json', {}, {});
    }])
    .factory('TrackService', ['$resource', function($resource){
        return $resource('json/tracks.json', {}, {});
    }])
    .factory('GenreService', ['$resource', function($resource){
        return $resource('json/genre.json', {}, {});
    }])