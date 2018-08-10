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
    scrollTop: $(anchor).offset().top
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
    header.removeClass('page__header--dark');
  } else {
    header.addClass('page__header--dark');
    header.removeClass('page__header--light');
  }
});

// Mapbox.
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q';
const mapContainer = document.querySelector('#map');
if (mapContainer) {
  // eslint-disable-next-line
  const map = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/devseed/cjjrefy0x1f712ss5spif25ve',
    center: [-77.025961, 38.891800],
    zoom: 14.3
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
