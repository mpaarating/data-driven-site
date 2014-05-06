angular.module('jukeroxApp')
    .controller('mainCtrl', ['$scope', '$rootScope', function($scope, $rootScope){

            /* Event handler plugin, credit Jim Poulakos https://github.com/jimpoulakos */

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

        $scope.$on('request.switch.genre', function(event, params){
            $scope.template.url = 'template/genre.html';
        });


        var myAudio = angular.element(document.querySelector('myAudio'));

        $scope.currently_playing = {
            src: '',
            audio: angular.element(document.querySelector('myAudio')),
            cover: '',
            title: '',
            artist: '',
            albumName: '',
            width: 0,
            next: function(){
                var len = this.album.tracks.length;
                this.queue++;
                if(this.queue >= len) this.queue = 0;

                this.select_track();
            },
            prev: function(){
                this.queue--;
                if(this.queue < 0) this.queue = this.album.tracks.length - 1;

                this.select_track();
            },
            stop: function(){
                this.audio.pause();
            },
            play: function(){
                if(this.src != ''){
                    this.audio.play();
                }
            },
            album: {},
            queue: 0,
        select_new_album: function(album){
            this.album = album;
            this.queue = 0;
            this.select_track();
        },
        select_track: function(){
            this.cover = this.album.cover;
            this.albumName = this.album.name;
            this.artist = this.album.artist;
            this.src = this.album.tracks[this.queue].src;
            this.title = this.album.tracks[this.queue].title;
        },
        update: function(){
            // Interval function to update width;
        }
    }

        $scope.$on('play.album', function(event, params){
            $scope.currently_playing.select_new_album(params);
        })
        $scope.$on('play.track', function (event, params){

        })

    }])
        .controller('ArtistCtrl', ['$scope', 'ArtistsService', function($scope, ArtistsService){
            $scope.artists = ArtistsService.query({}, function(d){}, function(d){});
        }])
        .controller('AlbumCtrl', ['$scope', 'AlbumsService', function($scope, AlbumsService){
            $scope.albums = AlbumsService.query({}, function(d){}, function(d){});
            $scope.genre_clicked = function(genre){
                $scope.$emit('request.switch.genre', {});
                $scope.$emit('artist.genre.select', {genre: genre});
            }
            $scope.play_album = function(album){
                $scope.$emit('play.album', album);
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