define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    return function (config) {
        $('#newsletter-validate-detail').submit(function(){
                window.dataLayer = window.dataLayer || [ ]; // init

                var dlClickNewsletter = {
                    'event':'clickFooterNewsletter'
                };

                if (window.dataLayer) {
                    dataLayer.push(dlClickNewsletter);
                }
        });
    };
});


