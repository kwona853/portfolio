define([
    'jquery',
    'jquery-ui-modules/widget',
    'owlcarousel'
], function ($) {
    "use strict";

    $.widget('cms.setcarousel', {
        options: {
            autoWidth: null,
            nav: true,
            navElement: 'button',
            dots: true,
            items: 3,
            margin: 24,
            video: false,
            videoWidth: false,
            videoHeight: false,
            center: false,
            loop: false
        },
        _create: function () {
            if ($(this.element).children().length > 1) {
                $(this.element).owlCarousel({
                    autoWidth: this.options.autoWidth,
                    nav: this.options.nav,
                    dots: this.options.dots,
                    video: this.options.video,
                    videoWidth: this.options.videoWidth,
                    videoHeight: this.options.videoHeight,
                    center: this.options.center,
                    loop: this.options.loop,
                    margin: this.options.margin,
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items:1
                        },
                        768: {
                            items: 2
                        },
                        1024: {
                            items: this.options.items
                        }
                    }
                });
            } else {
                $(this.element).removeClass('owl-carousel');
            }
        }
    });

    return $.cms.setcarousel;
});
