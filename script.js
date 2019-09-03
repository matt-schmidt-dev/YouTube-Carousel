//YouTube API App Carousel
jQuery(document).ready(function() {

  var key = '';
  var playlistId = '';
  var url = 'https://www.googleapis.com/youtube/v3/playlistItems';

  var options = {
    part: 'snippet',
    key: key,
    maxResults: 15,
    playlistId: playlistId
  }

  loadVids();

  function loadVids() {
    jQuery.getJSON(url, options, function(data){
      var id = data.items[0].snippet.resourceId.videoId;
      /*mainVid(id);*/
      resultsLoop(data);
    })
  }


  function resultsLoop(data) {

    $.each(data.items, function(i, item) {

      var eachId = item.snippet.resourceId.videoId;

      jQuery('.carousel-track').append(`
        <iframe class="carousel-iframes"
        src="https://www.youtube.com/embed/${eachId}"
        frameborder="0" allow="accelerometer; autoplay;
        encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
        `);

    });

    var track = document.querySelector('.carousel-track');
    var theIframes = Array.from(track.children).reverse();
    var prevButton = document.querySelector('.carousel-button-prev');
    var nextButton = document.querySelector('.carousel-button-next');

    var iframeWidth = theIframes[0].getBoundingClientRect().width;

    var numberOfIframes = theIframes.length;

    //Initial Slide Arrangement
    /*theIframes[0].style.left = slideWidth * 0;
    theIframes[1].style.left = iframeWidth * 1 + 'px';
    theIframes[2].style.left = iframeWidth * 2 + 'px';
    theIframes[3].style.left = iframeWidth * 3 + 'px';
    theIframes[4].style.left = iframeWidth * 4 + 'px';*/

    var setIframePosition = (anIframe, index) => {
      anIframe.style.left = iframeWidth * index + 'px';
    };
    theIframes.forEach(setIframePosition);

/*
    //Choose where '.current-iframe' starts

    var allIframes = document.getElementByClass('.carousel-iframes');

    allIframes[2].className += 'current-iframe';

    //jQuery('.carousel-iframes')[2].addClass('current-iframe');
*/

track.style.width = ((numberOfIframes * iframeWidth) + 10) + 'px';

    //Click Next Equals Move to Left
    nextButton.addEventListener('click', e => {
      var currentTrackPositionLeft = document.querySelector('.carousel-track').getBoundingClientRect().left;
      var currentTrackPositionRight = document.querySelector('.carousel-track').getBoundingClientRect().right;
      var currentTrackContainerWidth = document.querySelector('.carousel-track-container').getBoundingClientRect().width;

      if (currentTrackPositionRight < currentTrackContainerWidth + 5 || currentTrackPositionRight == currentTrackContainerWidth + 5) {
      track.style.right = currentTrackPositionLeft + 'px)';
    }else {
      track.style.transform = 'translateX(calc(' + currentTrackPositionLeft + 'px - 350px))';
    }
      });

    //Click Next Equals Move to Left
    prevButton.addEventListener('click', e => {
      var currentTrackPositionLeft = document.querySelector('.carousel-track').getBoundingClientRect().left;

      if (currentTrackPositionLeft > 5 || currentTrackPositionLeft == 5) {
      track.style.left = currentTrackPositionLeft + 'px)';
    }else {
      track.style.transform = 'translateX(calc(' + currentTrackPositionLeft + 'px + 340px))';
    }
    });


      //(numberOfIframes * 350)

  }

});
