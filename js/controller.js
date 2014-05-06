angular.module('jukeroxApp')
    .controller('mainCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
            $rootScope.events = [
                {receive: 'artist.genre.select', broadcast: 'genre.selected'}
            ];
            $rootScope.registered = false;

            /**
             * fetch_event
             * This function fetches the event from the master events list.
             * @param <string> receiver This is the event name received via $broadcast in a child element.
             * @return <object> Returns the specified receiver object.
             */
            $rootScope.fetch_event = function(receiver){
                var len = $rootScope.events.length;
                while(len--){
                    if(receiver == $rootScope.events[len].receive){
                        return $rootScope.events[len];
                    }
                }
            };

            /**
             * broadcast
             * This function broadcasts a dispatch message to child controllers
             */
            $rootScope.broadcast = function(event, params){
                $rootScope.$broadcast(event, params);
            };

            /**
             * receive
             * This function receives broadcast from child controllers.
             */
            $rootScope.receive = function(event, params){
                var e = $rootScope.fetch_event(event.name);
                $rootScope.broadcast(e.broadcast, params);
            };

            /**
             * __init
             * This is the initialization function. Should be called only once upon initialization
             */
            $rootScope.__init = function(){
                if($rootScope.registered) return;

                var len = $rootScope.events.length;
                while(len--){
                    $rootScope.$on($rootScope.events[len].receive, this.receive);
                }
                $rootScope.registered = true;
            };

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
            $scope.genre_clicked = function(genre){
                $scope.$emit('artist.genre.select', {genre: genre});
            }
        }])
        .controller('TrackCtrl', ['$scope', 'TrackService', function($scope, TrackService){
            $scope.tracks = TrackService.query({}, function(d){}, function(d){});
        }])
        .controller('GenreCtrl', ['$scope', 'GenreService', function($scope, GenreService){
            $scope.genreTypes = GenreService.query({}, function(d){}, function(d){});
            $scope.$on('genre.selected', function(event, params){
                var len = $scope.genreTypes.length;
                $scope.search.name = params.genre;
            });
        }])