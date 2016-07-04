var stopTime = 30;    //in seconds
var customVideoDuration = 4820;   //in seconds
var offerLink = 'https://www.google.com';   //set link to Sponsored Offer


$(document).ready(function(){

    $('#currenttime').text('test');

    $('.templMessLast').attr('href', offerLink);

    $('.templMessLast').click(function(){
        console.log($(this).attr('href'));
        window.open($(this).attr('href'));
    });

    var controls = {
        video: $("#myvideo"),
        playpause: $("#playpause"),
        total: $("#total"),
        buffered: $("#buffered"),
        progress: $("#current"),
        duration: $("#duration"),
        currentTime: $("#currenttime"),
        hasHours: false,
        togglePlayback: function() {

            if (video.paused) {
                video.play();
                $(this).attr("src", 'icons/pause.png');
            } else {
                video.pause();
                $(this).attr("src", 'icons/play.png');
            }
        },
        subtitle: $('#subtitls'),
        message : $('#message'),
        volume: $('#volume'),
        fullsc: $('#fullsc'),
        toggleFullScreen: function (){
            if(video.requestFullScreen){
                video.requestFullScreen();
            } else if(video.webkitRequestFullScreen){
                video.webkitRequestFullScreen();
            } else if(video.mozRequestFullScreen){
                video.mozRequestFullScreen();
            }
        }
    };

    var video = controls.video[0];

    controls.playpause.click(controls.togglePlayback);

    video.addEventListener("canplay", function() {
        controls.hasHours = (customVideoDuration / 3600) >= 1.0;
        controls.duration.text(formatTime2(customVideoDuration, true  ));
        controls.currentTime.text(formatTime2(0),controls.hasHours);
    }, false);

    video.addEventListener("timeupdate", function() {

        controls.currentTime.text(formatTime2(video.currentTime));

        var progress = Math.floor(video.currentTime) / Math.floor(2300);

        controls.progress[0].style.width = Math.floor(progress * controls.total.width()) + "px";
    }, false);

    var test = true;

    video.addEventListener("timeupdate", function() {
        if(video.currentTime > stopTime && test){
            video.pause();
            $('#playpause').attr("src", 'icons/pause.png');
            $('.template').css('display', 'block');
        }

        if(video.currentTime > 0 && video.currentTime < 2){
            test = true;
        }
    }, false);

    $('#closeTemp').click(function(){
        video.play();
        $('#playpause').attr("src", 'icons/play.png');
        $('.template').css('display', 'none');
        test = false;
    });

    controls.total.click(function(e) {
        var x = (e.pageX - this.offsetLeft)/$(this).width();
        var countLeftMarg = +$('.videoPlayer').css('margin-left').slice(0, -2);
        var counMar = +$('.container').css('margin-left').slice(0, -2);
        var stoProc = ((countLeftMarg + counMar + $(this).width()) - (countLeftMarg + counMar));
        var odinProc = stoProc / 100;
        var prog = e.pageX - (countLeftMarg + counMar);
        var videoOdinProc = video.duration / 100;

        video.currentTime = videoOdinProc * (prog / odinProc);
    });

    controls.volume.click(mute);

    $('#volumeslider').on('mousemove',function(){

        $("#myvideo")[0].volume = $('#volumeslider')[0].value / 100;

    });

    controls.fullsc.click(controls.toggleFullScreen);

    $('.videoPlayer').mouseover(function(){

        $('.controlBar').css('opacity', 1);

    });

    $('.videoPlayer').mouseout(function(){

        $('.controlBar').css('opacity', 0);

    });

});

function formatTime2(time) {
    var h = Math.floor(time / 3600);
    time = time - h * 3600;

    var m = Math.floor(time / 60);
    var s = Math.floor(time % 60);

    return h.lead0(2)  + ":" + m.lead0(2) + ":" + s.lead0(2);
}

Number.prototype.lead0 = function(n) {
    var nz = "" + this;
    while (nz.length < n) {
        nz = "0" + nz;
    }
    return nz;
};

function mute (){

    $("#myvideo")[0].muted = !$("#myvideo")[0].muted;

    if($("#myvideo")[0].muted){
        $('#volume').attr('src', 'icons/mute.png')
    }
    else{
        $('#volume').attr('src', 'icons/volume.png')
    }

}

