define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    return function (config) {
        $(document).on('click', '.footer-social a', function() {
            var name = $(this).find(".text");

            window.dataLayer = window.dataLayer || [ ]; // init

            var dlClickFooterSocial = {
                'event':'clickFooterSocial',
                'socialName': $.trim(name.text()),
            };

            if (window.dataLayer) {
                dataLayer.push(dlClickFooterSocial);
            }
        });
    };
});


