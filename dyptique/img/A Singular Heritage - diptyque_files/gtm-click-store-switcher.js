define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    return function () {
        $(document).on('click', '.switcher-dropdown > li', function() {
            window.dataLayer = window.dataLayer || [ ]; // init

            var dlClickStore = {
                'event':'clickChangeLanguage',
                'action':'Language',
                'country':$.trim($(this).text())
            };

            if (window.dataLayer) {
                dataLayer.push(dlClickStore);
            }
        });
        $(document).on('click', 'a.store-switcher', function() {

            window.dataLayer = window.dataLayer || [ ]; // init

            var dlClickStore = {
                'event':'clickChangeLanguage',
                'action':'Country',
                'country':$.trim($(this).text())
            };

            if (window.dataLayer) {
                dataLayer.push(dlClickStore);
            }
        });
    };
});


