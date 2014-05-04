
var myAudio = document.getElementById('myAudio');

$.getJSON(" data/artists.json", function( artists ){
    var i = 0;

    var previousSong = $("#back");
    var nextSong = $("#next");
    var stopSong = $("#stop");
    var playSong = $("#play");
    var isPlaying = false;
    var currentPlayTime = Math.round(myAudio.currentTime * 100);
    var songDuration = Math.round(myAudio.duration * 100);
    var progressBarWidth = Math.round((Math.round(myAudio.currentTime * 100))/(Math.round(myAudio.duration *100))*100) + "%";

    function playNext(){
        i ++;

        if (i >= artists.albums.source.length){
            i = artists.albums.source.length - 1;
        }

        $(".album-title").html(data.tracks[i].title + " by " + data.tracks[i].artist + " on " + data.tracks[i].album );
        $(".album-art").attr({
            src: artists.albums.cover,
            alt: artists.albums.albumName
        });
        myAudio.src=(artists.albums.source[i]);
        myAudio.load();
        $('.progress').html('<div class="progress-bar" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: 0">' + '</div>')
        myAudio.play();
        isPlaying = true;
    }

    function playPrevious(){
        i --;

        if (i <= 0){
            i = 0;
        }

        $(".album-title").html(data.tracks[i].title + " by " + data.tracks[i].artist + " on " + data.tracks[i].album);
        $(".album-art").attr({
            src: artists.albums.cover,
            alt: artists.albums.albumName
        });
        myAudio.src=(artists.albums.source[i]);
        myAudio.load();
        $('.progress').html('<div class="progress-bar" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: 0">' + '</div>')
        myAudio.play();
        isPlaying = true;
    }

    playSong.click(function(){
        $.getJSON( "data/artists.json", function( artists ) {
            $(".album-title").html( artists.albums.trackTitles[i] + " by " + artists.artist + " on " + artists.ablums.albumName);
            $(".album-art").attr({
                src: data.tracks[i].cover,
                alt: data.tracks[i].album
            });
            myAudio.src=(data.songs[i]);
            myAudio.load();
            $('.progress').html('<div class="progress-bar" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: 0">' + '</div>');
            myAudio.play();
            isPlaying = true;
        });
    })

    stopSong.click(function(){
        myAudio.pause();
        isPlaying = false;
    })

    nextSong.click(function(){
        $.getJSON( "data/artists.json", function( data ) {
            playNext();
        });
    });

    previousSong.click(function(){
        $.getJSON( "data/artists.json", function( data ) {
            playPrevious();
        });
    })

    setInterval(function() {
        var progressBarWidth = ((Math.round(myAudio.currentTime * 100))/(Math.round(myAudio.duration *100))*100).toFixed(2) + "%";
        var minutes = Math.floor(((myAudio.duration - 35)-(myAudio.currentTime))/60);
        var seconds = Math.floor(((myAudio.duration - 35)-(myAudio.currentTime))-(minutes*60)).toFixed(0);
        var strSeconds = seconds;

        if (seconds < 10) {
            strSeconds = "0" + seconds;
        }

        var timeRemaining = minutes + ":" + strSeconds;

        if(isPlaying){
            $(".progress-bar").css("width", progressBarWidth);
            $(".timeLeft").html(timeRemaining);
        }
    }, 1000);

    myAudio.addEventListener('ended', function(event) {
        $.getJSON( "data/artists.json", function( artists ) {
            $(".album-title").html(artists.albums.trackTitles[i] + " by " + artists.artist + " on " + artists.ablums.albumName);
            playNext();
        });
    })
})

//places active state on nav buttons when clicked
$('ul.nav li').click( function() {
    $(this).addClass('active').siblings().removeClass('active');
});


