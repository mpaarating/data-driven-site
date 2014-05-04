angular.module('jukeroxApp')
    .controller('mainCtrl', ['$scope', function($scope){
        $scope.template = { url: '' };

        $scope.links = [
            {label: 'Artists', url: 'template/artists.html'},
            {label: 'Albums', url: 'template/albums.html'},
            {label: 'Tracks', url: 'template/tracks.html'}
        ]
    }])
        .controller('ArtistCtrl', ['$scope', 'ArtistsService', function($scope, ArtistsService){
            $scope.artists = ArtistsService.query({}, function(d){}, function(d){});
        }])
        .controller('AlbumCtrl', ['$scope', 'AlbumsService', function($scope, AlbumsService){
            $scope.albums = AlbumsService.query({}, function(d){}, function(d){});
        }])