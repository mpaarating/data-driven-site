angular.module('jukeroxApp')
    .controller('mainCtrl', ['$scope', '$rootScope', '$interval', function($scope, $rootScope, $interval){

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

        $scope.player = {
            audio_element: document.getElementById('myAudio'),
            title: '',
            play: function(track){
                this.title = track.title;
                this.audio_element.pause();
                this.audio_element.src = track.src;
                this.audio_element.play();
                this.stop_update();
                this.update();
            },
            stop: function(){
                this.audio_element.pause();
                if(angular.isDefined(this.interval)){
                    $interval.cancel(this.interval);
                    this.interval = undefined;
                }
            },
            interval: undefined,
            update: function(){
                this.interval = $interval(function() {
                    var progressBarWidth = ((Math.round(this.audio_element.currentTime * 100))/(Math.round(this.audio_element.duration *100))*100).toFixed(2) + "%";
                    var minutes = Math.floor(((this.audio_element.duration - 35)-(this.audio_element.currentTime))/60);
                    var seconds = Math.floor(((this.audio_element.duration - 35)-(this.audio_element.currentTime))-(minutes*60)).toFixed(0);
                    var strSeconds = seconds;
                    if (seconds < 10) {
                        strSeconds = "0" + seconds;
                    }
                    var timeRemaining = minutes + ":" + strSeconds;
                    $(".progress-bar").css("width", progressBarWidth);
                    $(".timeLeft").html(timeRemaining);
                }.bind(this), 1000);
            },
            stop_update: function(){
                $interval.cancel(this.interval);
            }
        };

        $scope.track_queue = {
            master: [],
            queue: 0,
            next: function(){
                var len = this.master.length;
                this.queue++;
                if(this.queue >= len) this.queue = 0;
                this.play_track();
            },
            prev: function(){
                this.queue--;
                if(this.queue < 0) this.queue = this.master.length - 1;
                this.play_track();
            },
            play_track: function(){
                if(this.master[this.queue].artist){
                    this.set_details(this.master[this.queue].name, this.master[this.queue].cover, this.master[this.queue].artist);
                }
                $scope.player.play(this.master[this.queue]);
            },
            set_master: function(tracks){
                this.master = tracks;
                this.queue = 0;
                this.play_track();
            },
            album_name: '',
            album_cover: '',
            artist: '',
            set_details: function(album_name, album_cover, artist){
                this.album_name = album_name;
                this.album_cover = album_cover;
                this.artist = artist;
            }
        };

        $scope.$on('play.album', function(event, params){
            $scope.track_queue.set_details(params.name, params.cover, params.artist);
            $scope.track_queue.set_master(params.tracks);
        });
        $scope.$on('play.track', function(event, params){
            $scope.track_queue.set_master(params.tracks);
            $scope.track_queue.queue = params.track;
            $scope.track_queue.play_track();
        });
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

        $scope.play_track = function(track){
            var len = $scope.tracks.length;
            while (len--) if($scope.tracks[len].id == track.id) break;
            $scope.$emit('play.track', {track: len, tracks: $scope.tracks});
        }
    }])
    .controller('GenreCtrl', ['$scope', 'GenreService', function($scope, GenreService){
        $scope.genreTypes = GenreService.query({}, function(d){}, function(d){});
        $scope.$on('genre.selected', function(event, params){
            var len = $scope.genreTypes.length;
            $scope.search.name = params.genre;
        });
    }])