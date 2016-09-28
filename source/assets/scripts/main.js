import $ from 'jquery';
import mapboxgl from 'mapbox-gl';

// Global menu toggle.
var menuWrapper = $('[data-hook="global-menu:wrapper"]');
$('[data-hook="global-menu:trigger"]').on('click', function (e) {
  e.preventDefault();
  menuWrapper.toggleClass('menu-wrapper--open');
});

// Global menu scroll to position.
$('#global-menu a').on('click', function (e) {
  menuWrapper.removeClass('menu-wrapper--open');

  var anchor = $(this).attr('href').match(/(#.+)/);
  anchor = anchor[1] || '';
  $('html, body').stop().animate({
    scrollTop: $(anchor).offset().top - $('[data-hook="page-header"]').outerHeight()
  }, 750);
  e.preventDefault();
});

// Header stick.
$(window).scroll(function () {
  if (!$('[data-hook="nav-offset"]').length) {
    return;
  }
  let header = $('[data-hook="page-header"]');
  if (header.offset().top > $('[data-hook="nav-offset"]').offset().top - header.outerHeight()) {
    header.addClass('page__header--light');
  } else {
    header.removeClass('page__header--light');
  }
});

// Mapbox.
mapboxgl.accessToken = 'pk.eyJ1IjoidGF0aWFuYSIsImEiOiJjaWs1bzRiZGQwMDdjcHRrc285bTdwcWU5In0.0EWPVHyjaE9jTzNvOiIO-w';
// eslint-disable-next-line
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/tatiana/cirghsrcr000qggm7y4vh3f0q',
  center: [-77.0216026, 38.8956264],
  zoom: 15.85
});

map.scrollZoom.disable();
