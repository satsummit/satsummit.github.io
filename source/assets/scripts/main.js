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
const mapContainer = document.querySelector('#map');
if (mapContainer) {
  // eslint-disable-next-line
  const map = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/tatiana/cirghsrcr000qggm7y4vh3f0q',
    center: [-77.0216026, 38.8956264],
    zoom: 15.85
  });
  map.scrollZoom.disable();
}

// Page size fix.
const fixBodyHeight = function () {
  // Page size
  let body = $('.inpage__body');
  let bodyH = body.outerHeight();
  let footerH = $('.page__footer').outerHeight();
  let headerH = $('.inpage__header').outerHeight();
  let windowH = $(window).height();

  // Store original size.
  if (!body.data('originalSize')) {
    body.data('originalSize', bodyH);
  }

  let minHeight = windowH - headerH - footerH;
  minHeight = Math.max(minHeight, body.data('originalSize'));
  body.css('min-height', minHeight);
};

$(window).resize(fixBodyHeight);
fixBodyHeight();
