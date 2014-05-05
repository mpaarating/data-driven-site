angular.module('jukeroxApp')
    .controller('mainCtrl', ['$scope', function($scope){
        $scope.template = { url: '' };

        $scope.links = [
            {label: 'Artists', url: 'template/artists.html'},
            {label: 'Albums', url: 'template/albums.html'},
            {label: 'Tracks', url: 'template/tracks.html'},
            {label: 'Genre', url: 'template/genre.html'}
        ]
    }])
        .controller('ArtistCtrl', ['$scope', 'ArtistsService', function($scope, ArtistsService){
            $scope.artists = ArtistsService.query({}, function(d){}, function(d){});
        }])
        .controller('AlbumCtrl', ['$scope', 'AlbumsService', function($scope, AlbumsService){
            $scope.albums = AlbumsService.query({}, function(d){}, function(d){});
        }])
        .controller('TrackCtrl', ['$scope', 'TrackService', function($scope, TrackService){
            $scope.tracks = TrackService.query({}, function(d){}, function(d){});
        }])
        .controller('GenreCtrl', ['$scope', 'GenreService', function($scope, GenreService){
            $scope.genreTypes = GenreService.query({}, function(d){}, function(d){});
        }])