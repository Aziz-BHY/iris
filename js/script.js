;(function ($) {
  'use strict';

  // SCROLL TO TOP BEHAVIOR
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 100) {
      $('.backtop, .backtop-modern').addClass('reveal');
    } else {
      $('.backtop, .backtop-modern').removeClass('reveal');
    }
  });

  $('.backtop, .backtop-modern').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 400);
  });

  // Mobile Navigation: Close dropdowns and collapses when clicking a normal link
  $('.navbar-nav .nav-link:not(.dropdown-toggle)').on('click', function () {
    if ($(window).width() < 992) {
      $('.navbar-collapse').collapse('hide');
    }
  });

  // Mobile Dropdown Toggle Fix
  $('.dropdown-toggle').on('click', function (e) {
    if ($(window).width() < 992) {
      e.preventDefault();
      $(this).next('.dropdown-menu').toggleClass('show');
    }
  });

  // Sliders with safe initialization
  if ($('.portfolio-single-slider').length) {
    $('.portfolio-single-slider').slick({
      infinite: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000
    });
  }

  if ($('.clients-logo').length) {
    $('.clients-logo').slick({
      infinite: true,
      arrows: false,
      autoplay: true,
      slidesToShow: 6,
      slidesToScroll: 2,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            infinite: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  if ($('.testimonial-wrap').length) {
    $('.testimonial-wrap').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 6000
    });
  }

  // Counter
  if ($('.counter-stat span').length && $.fn.counterUp) {
    $('.counter-stat span').counterUp({
      delay: 10,
      time: 1000
    });
  }

  // Shuffle.js filter and masonry (Safely guarded)
  var shuffleWrapper = document.querySelector('.shuffle-wrapper');
  if (shuffleWrapper && window.Shuffle) {
    var myShuffle = new window.Shuffle(shuffleWrapper, {
      itemSelector: '.shuffle-item',
      buffer: 1
    });

    $('input[name="shuffle-filter"]').on('change', function (evt) {
      var input = evt.currentTarget;
      if (input.checked) {
        myShuffle.filter(input.value);
      }
    });

    $('.filter-btn').on('click', function (e) {
      e.preventDefault();
      $('.filter-btn').removeClass('active');
      $(this).addClass('active');
      var group = $(this).attr('data-group');
      if (group === 'all') {
        myShuffle.filter(window.Shuffle.ALL_ITEMS);
      } else {
        myShuffle.filter(group);
      }
    });
  }

  // Google Maps safe initialization
  var googleMapCanvas = $('#map-canvas');
  if (googleMapCanvas.length && typeof google !== 'undefined' && google.maps) {
    try {
      var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(36.7644, 10.2289) // Megrine, Ben Arous, Tunisia
      };
      new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    } catch (err) {
      console.warn('Map initialization failed:', err);
    }
  }

})(jQuery);
