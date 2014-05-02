angular.module('jukeroxApp')
    .controller('mainCtrl', ['$scope', function($scope){
        $scope.template = { url: '' };

        $scope.links = [
            {label: 'Artist', url: 'template/artists.html'},
            {label: 'Album', url: 'template/album.html'},
            {label: 'Search', url: 'template/search.html'}
        ]
    }])
        .controller('listController', ['$scope', 'TracksService', function($scope, ArtistsService){
            $scope.artists = ArtistsService.query({}, function(d){}, function(d){});
        }])
        .controller('radioController', ['$scope', function($scope){
            $scope.items = [
                {name: 'Item 1'},
                {name: 'Item 3'},
                {name: 'Item 2'}
            ];
        }])

