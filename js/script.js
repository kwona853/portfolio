'use strict';

function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

// Check if it's time to start the animation.
function startAnimation() {
    console.log("animating")
    var $elem = $('.web-design');
    console.log("elem", $elem)
    // If the animation has already been started
    if ($elem.hasClass('slideIn')) return;

    if (isElementInViewport($elem)) {
        // Start the animation
        $elem.addClass('slideIn');
    }
}

// Capture scroll events
$(window).scroll(function(){
    startAnimation();
});