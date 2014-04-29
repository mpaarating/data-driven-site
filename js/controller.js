angular.module('jukeroxApp')
    .controller('artistListCtrl', ['$scope', function($scope){
        $scope.tracks =
            [
                {
                    "title": "Pro Nails",
                    "artist": "Kid Sister",
                    "album": "Rusko Remix Album",
                    "cover": "images/album-cover.jpg"
                },
                {
                    "title": "Dutch Flowerz",
                    "artist": "Skream",
                    "album": "Rusko Remix Album",
                    "cover": "images/album-cover.jpg"
                },
                {
                    "title": "Feelings Gone",
                    "artist": "Bassment Jaxx",
                    "album": "Rusko Remix Album",
                    "cover": "images/album-cover.jpg"
                }
            ];
    }]);
