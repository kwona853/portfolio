define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    return function () {

        $(document).on('click', '.slick-slide', function() {
            var slidePosition = "";
            var sectionName = "";
            var slideCategory = "";
            window.dataLayer = window.dataLayer || [ ]; // init

            if ($(this).context.attributes != undefined && $(this).context.attributes != 'undefined') {
                slidePosition = $(this).context.attributes[1].value
            }

            if ($(this).parents() != undefined && $(this).parents() != 'undefined') {
                var parentBlock = $(this).parents()[3];
                sectionName = $(parentBlock).children()[0].innerText;
            }

            if ($(this) != undefined && $(this) != 'undefined') {
                slideCategory = $($(this).find('img')).attr('alt');
            }

            var dlHpCarousel = {
                'event': 'clickHPCarousel',
                'sectionName': sectionName,
                'position': slidePosition,
                'category': slideCategory,
            };


            if (window.dataLayer) {
                dataLayer.push(dlHpCarousel);
            }
        });
    };
});


