define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    return function () {
        $(document).on('click', '.widget-image-text-custom-border-block.images-src-mode.image_full_width.banner-home-minthe', function() {

            window.dataLayer = window.dataLayer || [ ]; // init

            var sectionName = "";

            sectionName = jQuery(this)[0].querySelector('.title1').innerText + ' ' + jQuery(this)[0].querySelector('.title3').innerText;

            if (($(this).prev().prev() != 'undefined' && $(this).prev().prev() != undefined) &&
                ($(this).prev().prev()[0] != 'undefined' && $(this).prev().prev()[0] != undefined)&&
                ($(this).prev().prev()[0].firstChild != 'undefined' && $(this).prev().prev()[0].firstChild != undefined)&&
                ($(this).prev().prev()[0].firstChild.nextElementSibling != 'undefined' && $(this).prev().prev()[0].firstChild.nextElementSibling != undefined)) {
                sectionName = $(this).prev().prev()[0].firstChild.nextElementSibling.innerText;
            }

            var dlAccountLogin = {
                'event': 'clickHPPictures',
                'sectionName': sectionName,
            };

            if (window.dataLayer) {
                dataLayer.push(dlAccountLogin);
            }
        });
    };
});


