//YouTube API App Carousel
jQuery(document).ready(function() {

  var key = 'AIzaSyCipJMqEaZvCAQycCJHb8Y5tti3h8Z56PQ';
  var playlistId = 'PLD6HNsanBrga637ZnUz59PesZ1UDH66W4';
  var url = 'https://www.googleapis.com/youtube/v3/playlistItems';

  var options = {
    part: 'snippet',
    key: key,
    maxResults: 5,
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


/*
  function mainVid(id) {
    jQuery('#video').html(`
      <iframe width="560" height="315"
      src="https://www.youtube.com/embed/${id}"
      frameborder="0" allow="accelerometer; autoplay;
      encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
      `)
  }
  */


  function resultsLoop(data) {

    $.each(data.items, function(i, item) {

      var eachId = item.snippet.resourceId.videoId;

      $('.carousel-track').append(`
        <li class="carousel-slide"><iframe class="all-iframes"
        src="https://www.youtube.com/embed/${eachId}"
        frameborder="0" allow="accelerometer; autoplay;
        encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe></li>
        `);

    });

    var track = document.querySelector('.carousel-track');
    var slides = Array.from(track.children);
    var prevButton = document.querySelector('.carousel-button-prev');
    var nextButton = document.querySelector('.carousel-button-prev');

    var slideWidth = slides[0].getBoundingClientRect().width;


    //Initial Slide Arrangement
    /*slides[0].style.left = slideWidth * 0;
    slides[1].style.left = slideWidth * 1 + 'px';
    slides[2].style.left = slideWidth * 2 + 'px';
    slides[3].style.left = slideWidth * 3 + 'px';
    slides[4].style.left = slideWidth * 4 + 'px';*/

    var setSlidePosition = (slide, index) => {
      slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);


    //Choose where '.current-slide' starts
    jQuery(slides[2].querySelector('iframe')).addClass('current-iframe');



    nextButton.addEventListener('click', e => {
      var cerrentSlide = track.querySelector('.current-iframe')
    });

  }

});
