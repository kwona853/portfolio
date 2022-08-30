define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    return function (config) {
        $(document).on('click', '.images-slick-carousel a', function() {
            var section = $(this).parents(".block-slick-carousel").find(".block-title span");
            var positionElem = $(this).parents(".block-slick-carousel").find(".slick-active button");

            $.ajax({
                type: 'POST',
                url: config.ajaxUrl,
                data: {section: $.text(section), position:positionElem.attr("aria-label").split(" ", 1).toString()},
                success: (result) => {
                },
                dataType: 'json'
            });
        });
    };
});


