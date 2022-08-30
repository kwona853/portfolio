define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    return function () {
        $(document).on('click', '.switcher-boutique', function() {

            window.dataLayer = window.dataLayer || [ ]; // init

            var dlClickShop = {
                'event':'clickShop'
            };

            if (window.dataLayer) {
                dataLayer.push(dlClickShop);
            }

        });
    };
});


